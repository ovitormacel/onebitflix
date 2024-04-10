import { Request, Response } from "express";
import { courseService } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { likeService } from "../services/likeService";
import { AuthenticatedRequest } from "../middlewares/auth";
import { favoriteService } from "../services/favoriteService";

export const coursesController = {
    // /courses/featured
    featured: async (req: Request, res: Response) => {

        try {
             const featuredCourses = await courseService.getRandomFeaturedCourses();
             return res.json(featuredCourses);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
        }
    },

    // /courses/newest
    newest: async (req: Request, res: Response) => {

        try {
             const newestCourses = await courseService.getTopTenNewest();
             return res.json(newestCourses);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
        }
    },

    // /courses/popular GET
    popular: async (req: Request, res: Response) => {
        try {
            const topTen = await courseService.getTopTenByLikes();
            return res.json(topTen)
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
        }
    },

    // /courses/search?name=
    search: async (req: Request, res: Response) => {
        const { name } = req.query;
        const [page, perPage] = getPaginationParams(req.query)

        try {
            if(typeof name !== 'string') throw new Error("'name' precisa ser uma String");
            const courses = await courseService.findByName(name, page, perPage);
            return res.json(courses);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
        }
    },

    // /courses/:id
    show: async (req: AuthenticatedRequest, res: Response) => {
        const courseId = req.params.id;
        const userId = req.user!.id;

        try {
             const course = await courseService.findByIdWithEpisodes(courseId);
             
             if(!course) return res.status(404).json({message: "Curso não encontrado."});
             
             const liked = await likeService.isLiked(userId, Number(courseId));
             const favorited = await favoriteService.isFavorited(userId, Number(courseId));

             return res.json({...course.get(), liked, favorited});
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
        }
    }
}
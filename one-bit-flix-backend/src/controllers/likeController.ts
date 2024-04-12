import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likeController = {
    // /likes POST
    save: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const { courseId } = req.body;

        try {
            const like = await likeService.create(userId, Number(courseId));
            res.status(201).json(like);
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
        }
    },

    // /likes/:id DELETE
    remove: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const courseId = req.params.id;

        try {
            await likeService.delete(userId, Number(courseId));
            res.status(204).send();
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
        }
    }

}
import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const episodesController = {
    // /episodes/stream?videoUrl=
    stream: async (req: Request, res: Response) => {
        const {videoUrl} = req.query;

        try {
            if (typeof videoUrl !== 'string') throw new Error("'videoUrl' deve ser do tipo string.");

            // Armazena o tamanho do pedaço do arquivo retornado.
            const range = req.headers.range; // bytes=0-2048
            
            episodeService.streamEpisodeToResponse(res, videoUrl, range);
            
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    },

    // /episodes/:id/watchtime GET
    getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const episodeId = Number(req.params.id);

        try {
            const watchTime = await episodeService.getWatchTime(userId, episodeId);
            return res.json(watchTime);
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    },

    // /episodes/:id/watchtime POST
    setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const episodeId = Number(req.params.id);
        const { seconds } = req.body;

        try {
            const watchTime = await episodeService.setWatchTime({
                userId,
                episodeId,
                seconds
            });
            
            return res.json(watchTime);
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    }
}
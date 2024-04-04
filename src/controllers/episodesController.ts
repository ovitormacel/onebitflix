import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";

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
    }
}
import { Response } from "express";
import fs from "fs";
import path from "path";

export const episodeService = {
    streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
        const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl);
        const fileStat = fs.statSync(filePath);

        if(range) {
            const parts = range.replace(/bytes=/, '').split('-');

            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;
        
            const chunkSize = (end - start) + 1;

            const file = fs.createReadStream(filePath, {start: start, end: end});

            // Configura o Header da Resposta definindo tamanho do Range e Tipo de Conteúdo
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            }

            // 206 = Conteúdo Parcial
            res.writeHead(206, head);

            // Devolve a Stream para a Resposta da Requisição
            file.pipe(res);
        } else {
            // Caso não haja Range, envia o arquivo Completo para o Front end
            const head = {
                'Content-Length': fileStat.size,
                'Content-Type': 'video/mp4'
            }

            res.writeHead(200, head);

            fs.createReadStream(filePath).pipe(res);
        }
    }
}
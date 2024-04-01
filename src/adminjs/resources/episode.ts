import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const episodeResourceOptions: ResourceOptions = {
    navigation: "Catálogo",
    editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'secondsLong'],
    filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'],
    listProperties: ['id', 'name', 'courseId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt'],
    showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt']
}

/* Configuração da Feature de Upload do AdminJs */
export const episodeResourceFeatures: FeatureType[] = [
    uploadFileFeature({
        /* Define o provedor de armazenamento e onde será armazenado (diretório) */
        provider: {
            local: {
                bucket: path.join(__dirname, '..', '..', '..', 'uploads')
            }
        },
        /* Define quais campos do recurso serão utilizados no recebimento do arquivo.
        videoUrl armazena o caminho e uploadVideo representa o input de upload do arquivo */
        properties: {
            key: 'videoUrl',
            file: 'uploadVideo'
        },
        // Define o nome do arquivo e esquema de pastas
        uploadPath: (record, filename) => `videos/course-${record.get('courseId')}/${filename}`
    })
]
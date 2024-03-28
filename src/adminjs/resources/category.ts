import { ResourceOptions } from "adminjs";

/* Definindo um novo Resource para o AdminJs onde serão 
manipuladas as informações de categorias*/
export const categoryResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'position'],
    filterProperties: ['name', 'position', 'createdAt', 'updatedAt'],
    listProperties: ['id', 'name', 'position'],
    showProperties: ['id', 'name', 'position', 'createdAt', 'updatedAt'],
}
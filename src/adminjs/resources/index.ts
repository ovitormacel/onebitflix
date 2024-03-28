import { ResourceWithOptions } from "adminjs";
import { Category } from "../../models";
import { categoryResourceOptions } from "./category";

// Lista de Resources do AdminJs
/* Define para o AdminJs, qual será o Model utilizado e
quais as opções. */
export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    }
]
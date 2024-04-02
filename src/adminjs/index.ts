import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";

//Utiliza o ORM Sequelize
AdminJS.registerAdapter(AdminJSSequelize);

//Configuração do AdminJS
export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: "/admin",
    resources: adminJsResources,
    branding: brandingOptions,
    locale: locale,

    // Personalização do Dashboard. Componente Dashboard
    dashboard: dashboardOptions
});

// Cria as rotas necessárias. Utilizado como um Middleware
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs, 
    authenticationOptions, 
    null, 
    {
        resave: false,
        saveUnitialized: false
    }
);

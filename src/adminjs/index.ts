import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { User } from "../models";
import bcrypt from "bcrypt";
import { locale } from "./locale";

//Utiliza o ORM Sequelize
AdminJS.registerAdapter(AdminJSSequelize);

//Configuração do AdminJS
export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: "/admin",
    resources: adminJsResources,
    branding: {
        companyName: 'OneBitFlix',
        logo: '/onebitflix.svg',
        theme: {
            colors: {
                primary100: '#ff0043',
                primary80: '#ff1a57',
                primary60: '#ff3369',
                primary40: '#ff4d7c',
                primary20: '#ff668f',
                grey100: '#151515',
                grey80: '#333333',
                grey60: '#4d4d4d',
                grey40: '#666666',
                grey20: '#dddddd',
                filterBg: '#333333',
                accent: '#151515',
                hoverBg: '#151515',
            }
        }
    },
    locale: locale
});

//Cria as rotas necessárias. Utilizado como um Middleware
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    // Solicita uma autenticação para as Rotas
    authenticate: async (email, password) => {
        const user = await User.findOne({ where: { email: email } });
        
        if (user && user.role === "admin") {
            const matched = await bcrypt.compare(password, user.password);
        
            if(matched) {
                // AUTENTICADO
                return user;
            }
        }

        // NÃO AUTENTICADO
        return false;
    },
    cookiePassword: "123456"
}, null, {
    resave: false,
    saveUnitialized: false
});

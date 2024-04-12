import { AuthenticationOptions } from "@adminjs/express";
import { User } from "../models";
import bcrypt from "bcrypt";

export const authenticationOptions: AuthenticationOptions = {
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
}
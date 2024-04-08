import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";

export const authController = {
    // POST /auth/register
    register: async (req: Request, res: Response) => {
        const {firstName, lastName, phone, birth, email, password} = req.body;

        try {
            const userExists = await userService.findUserByEmail(email);

            if(userExists) {
                throw new Error("E-mail já registrado.");
            }

            const user = await userService.create({
                firstName,
                lastName,
                phone,
                birth,
                email,
                password,
                role: 'user'
            })

            return res.status(201).json(user);

        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({ message: error.message })
            }
        }
    },

    // /auth/login
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const user = await userService.findUserByEmail(email);

            if(!user) return res.status(404).json({message: 'E-mail não registrado.'});

            // Utiliza o método "checkPassword" da INSTÂNCIA de User.
            user.checkPassword(password, (error, isSame) => {
                if(error) return res.status(400).json({message: error.message});
                if(!isSame) return res.status(401).json({message: 'Senha Incorreta'});

                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email
                }

                const token = jwtService.signToken(payload, '2d');

                return res.json({ authenticated: true, user: {...payload}, token})
            })
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({ message: error.message });
            }
        }
    }
}
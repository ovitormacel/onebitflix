import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";
import { decode } from "punycode";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authorizationHeader = req.headers.authorization;

    if(!authorizationHeader) return res.status(401).json({message: "Não autorizado."});

    const token = authorizationHeader.replace(/Bearer /, '');

    // Se o token for válido, encontra o Usuário no DB e retorna na request.
    jwtService.verifyToken(token, async (error, decoded) => {
        if(error || typeof decoded === 'undefined') return res.status(401).json({message: "Token Inválido."});

        const user = await userService.findUserByEmail((decoded as JwtPayload).email);

        req.user = user;
        next();
    })
}

export function ensureAuthInQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const {token} = req.query;

    if(!token) return res.status(401).json({message: "Não autorizado. Nenhum token encontrado."});
    if(typeof token !== 'string') return res.status(401).json({message: "Parâmetro token deve ser string."});

    jwtService.verifyToken(token, async (error, decoded) => {
        if(error || typeof decoded === 'undefined') return res.status(401).json({message: "Token Inválido."});

        const user = await userService.findUserByEmail((decoded as JwtPayload).email);
    
        req.user = user;
        next();
    })

}
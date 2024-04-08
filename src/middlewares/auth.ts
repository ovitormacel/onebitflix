import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authorizationHeader = req.headers.authorization;

    if(!authorizationHeader) return res.status(401).json({message: "Não autorizado."});

    const token = authorizationHeader.replace(/Bearer /, '');

    // Se o token for válido, encontra o Usuário no DB e retorna na request.
    jwtService.verifyToken(token, (error, decoded) => {
        if(error || typeof decoded === 'undefined') return res.status(401).json({message: "Token Inválido."});

        userService.findUserByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user;
            next();
        })
    })
}
import jwt from 'jsonwebtoken';

// HARD CODED para Testes
const secret = 'chave-jwt';

export const jwtService = {
    // Assina um token JWT
    signToken: (payload: string | object | Buffer, expiration: string) => {
        return jwt.sign(payload, secret, {
            expiresIn: expiration
        })
    },

    // Verifica um token JWT
    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, secret, callbackfn);
    }
}
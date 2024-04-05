import jwt from 'jsonwebtoken';

// HARD CODED para Testes
const secret = 'chave-jwt';

export const jwtService = {
    signToken: (payload: string | object | Buffer, expiration: string) => {
        return jwt.sign(payload, secret, {
            expiresIn: expiration
        })
    }
}
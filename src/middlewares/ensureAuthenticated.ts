import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

function ensureAuthentited(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('JWT token is missing', 401);

    const [, token] = authHeader.split(' ');

    try {
        if (!authConfig.jwt.secret) {
            throw new AppError("Invalid JWT token");
        }

        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayLoad;

        request.user = {
            id: sub,
        }

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}

export default ensureAuthentited;
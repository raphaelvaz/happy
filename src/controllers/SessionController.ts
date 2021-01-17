import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../models/User';
import SessionView from '../views/session_view';

export default {
    async create(request: Request, response: Response) {
        const { email, password } = request.body;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user) throw new AppError("Incorrect email/password combination", 401);

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) throw new AppError("Incorrect email/password combination", 401);

        const { secret, expiresIn } = authConfig.jwt;

        if (!secret) throw new AppError("Invalid JWT Token");

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        })

        return response.json(SessionView.render(user, token));
    }
}
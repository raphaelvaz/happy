import { getRepository } from 'typeorm';
import { addHours } from 'date-fns';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import UserToken from '../models/UserToken';
import User from '../models/User';

interface IRequest {
    token: string;
    password: string;
}

export default class ResetPasswordService {
    constructor() {
    }

    public async execute({ password, token }: IRequest): Promise<void> {
        const usersTokenRepository = getRepository(UserToken);
        const usersRepository = getRepository(User);

        const userToken = await usersTokenRepository.findOne({
            where: {
                token,
            }
        });

        if (!userToken) throw new AppError("UserToken does not exists");

        const user = await usersRepository.findOne(userToken.user_id);

        if (!user) throw new AppError("User does not exists");

        const expireTokenDate = addHours(userToken.created_at, 2);
        const now = Date.now();

        if (now > expireTokenDate.getTime()) throw new AppError("Token expired");

        user.password = await hash(password, 8);

        await usersRepository.save(user);
    }
}
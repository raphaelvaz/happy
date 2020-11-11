import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import User from '../models/User';
import UserView from '../views/user_view';

import AppError from '../errors/AppError';

export default {
    async index(request: Request, response: Response) {
        const usersRepository = getRepository(User);

        const users = await usersRepository.find();

        return response.json(UserView.renderMany(users));
    },

    async show(request: Request, response: Response) {
        const id = request.user.id;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOneOrFail(id);

        return response.json(UserView.render(user));
    },
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password,
        } = request.body;

        const data = {
            name,
            email,
            password,
        };

        const schema = Yup.object().shape({
            name: Yup.string().max(60).required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        })

        if (checkUserExists) throw new AppError('Email address already used');

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return response.status(201).json(UserView.render(user));
    },
}
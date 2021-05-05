import { getRepository } from 'typeorm';
import path from 'path';

import AppError from '../errors/AppError';
import User from '../models/User';
import UserToken from '../models/UserToken';

import IMailProvider from '../providers/MailProvider/models/IMailProvider';


interface IRequest {
    email: string;
}
export default class SendForgotPasswordEmailService {
    constructor(
        private mailProvider: IMailProvider) {
    }

    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getRepository(User);
        const userTokenRepository = getRepository(UserToken);

        const user = await usersRepository.findOne({
            where: {
                email,
            },
        });

        if (!user) throw new AppError("This User does not exists.");

        const userToken = userTokenRepository.create({
            user_id: user.id,
        })

        await userTokenRepository.save(userToken);

        const templatePath = path.resolve(__dirname, '..', 'providers', 'MailTemplateProvider', 'templates', 'forgot_password.hbs');

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[happy] Recuperação de senha',
            html: {
                file: templatePath,
                variables: {
                    name: user.name,
                    link: userToken.token,
                }
            }
        });
    }
}
import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';
import EtherealMailProvider from '../providers/MailProvider/implementations/EtherealMailProvider';
import HandlebarsMailProvider from '../providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

export default {
    async create(request: Request, response: Response) {
        const email = request.body;
        const handlebarsMailTemplateProvider = new HandlebarsMailProvider();
        const etherealMailProvider = new EtherealMailProvider(handlebarsMailTemplateProvider);
        const sendForgotPassword = new SendForgotPasswordEmailService(etherealMailProvider);
        await sendForgotPassword.execute(email);

        return response.status(204).json();
    }
}
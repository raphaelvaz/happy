import ISendMailDTO from '../dtos/SendEmailDTO';

export default interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}
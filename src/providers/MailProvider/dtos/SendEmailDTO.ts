import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';
interface IMailContact {
    name: string;
    email: string;
}

export default interface SendMailDTO {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    html: IParseMailTemplateDTO;
}
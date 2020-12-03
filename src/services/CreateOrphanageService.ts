import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import AppError from '../errors/AppError';
import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider';

interface IRequestOrphanage {
    name: string,
    latitude: number,
    longitude: number,
    about: string,
    instructions: string,
    opening_hours: string,
    open_on_weekends: boolean,
}

interface IRequestImage {
    path: string;
}

interface IRequest {
    orphanage: IRequestOrphanage,
    images: IRequestImage[],

}

export default class CreateOrphanageService {
    constructor(private StorageProvider: IStorageProvider) { }

    public async execute({ images, orphanage }: IRequest): Promise<Orphanage> {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanagesName = orphanage.name;

        const checkNameExists = await orphanagesRepository.findOne({
            where: { name: orphanagesName },
        });

        if (checkNameExists) {
            images.forEach(async ({ path }) => {
                await this.StorageProvider.delete("../" + path);
            });
            throw new AppError('Orphanage already exists');
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().min(-90).max(90).required(),
            longitude: Yup.number().min(-180).max(180).required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            })),
        })

        await schema.validate(orphanage, {
            abortEarly: false,
        });

        const createdOrphanage = orphanagesRepository.create({ ...orphanage, images });

        await orphanagesRepository.save(createdOrphanage);

        images.forEach(async ({ path }) => {
            await this.StorageProvider.save(path);
        });

        return createdOrphanage;
    }
}
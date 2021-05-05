import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider';
import Orphanage from '../models/Orphanage';
import Image from '../models/Image';

import AppError from '../errors/AppError';


interface IRequestOrphanage {
    name: string,
    latitude: number,
    longitude: number,
    about: string,
    instructions: string,
    opening_hours: string,
    open_on_weekends: string,
    accepted: string,
}

interface IRequestImage {
    path: string;
}

interface IRequest {
    id: string;
    orphanage: IRequestOrphanage,
    images: IRequestImage[],

}
export default class UpdateOrphanageService {
    constructor(private StorageProvider: IStorageProvider) { }

    public async execute({ id, orphanage: newOrphanage, images }: IRequest) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOne(id);

        if (!orphanage) {
            images.forEach(async ({ path }) => {
                await this.StorageProvider.delete(path);
            });
            throw new AppError("Orphanage not found.");
        }

        const {
            name,
            about,
            latitude,
            longitude,
            instructions,
            open_on_weekends,
            opening_hours,
            accepted,
        } = newOrphanage;

        orphanage.name = name;
        orphanage.latitude = latitude;
        orphanage.longitude = longitude;
        orphanage.about = about;
        orphanage.instructions = instructions;
        orphanage.opening_hours = opening_hours;
        orphanage.open_on_weekends = open_on_weekends === 'true';
        orphanage.accepted = accepted === 'true';

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().min(-90).max(90).required(),
            longitude: Yup.number().min(-180).max(180).required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            accepted: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            })),
        })

        await schema.validate({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            accepted,
            images,
        }, {
            abortEarly: false,
        });

        await orphanagesRepository.save(orphanage);

        const imagesRepository = getRepository(Image);

        const OldImages = await imagesRepository.find({
            where: {
                orphanage,
            }
        });

        await imagesRepository.remove(OldImages);

        OldImages.forEach(async ({ path }) => {
            await this.StorageProvider.delete(path);
        });

        const newImages = images.map(async ({ path }) => {
            const createdImage = imagesRepository.create({
                orphanage,
                path,
            });

            await this.StorageProvider.save(path);

            return createdImage;
        });

        Promise.all(newImages).then(async (response) => {
            await imagesRepository.save(response);
        });


    }
}
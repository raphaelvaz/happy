import { getRepository } from 'typeorm';

import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider';
import Orphanage from '../models/Orphanage';
import Image from '../models/Image';
import AppError from '../errors/AppError';

interface IRequest {
    id: string;
}

export default class DeleteOrphanageService {
    constructor(private StorageProvider: IStorageProvider) { }

    public async execute({ id }: IRequest) {
        const orphanagesRepository = getRepository(Orphanage);
        const imagesRepository = getRepository(Image);

        const orphanage = await orphanagesRepository.findOne(id);

        if (!orphanage) throw new AppError("Orphanage not found");

        const OldImages = await imagesRepository.find({
            where: {
                orphanage,
            }
        });

        OldImages.forEach(async (oldImage: Image) => {
            await this.StorageProvider.delete(oldImage.path);
        });

        await orphanagesRepository.remove(orphanage);
    }
}
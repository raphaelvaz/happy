import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';

import CreateOrphanageService from '../services/CreateOrphanageService';
import UpdateOrphanageService from '../services/UpdateOrphanageService';
import DiskStorageProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';
//import S3StorageProvider from '../providers/StorageProvider/implementations/S3StorageProvider';
import DeleteOrphanageService from '../services/DeleteOrphanageService';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(OrphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(OrphanageView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        const orphanage = request.body;

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const s3Storage = new DiskStorageProvider();
        const createOrphanage = new CreateOrphanageService(s3Storage);

        const createdOrphanage = await createOrphanage.execute({ images, orphanage });

        return response.status(201).json(createdOrphanage);
    },
    async update(request: Request, response: Response) {

        const { id } = request.params;

        const orphanage = request.body;

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const diskStorage = new DiskStorageProvider();
        const updateOrphanage = new UpdateOrphanageService(diskStorage);

        await updateOrphanage.execute({ id, images, orphanage });

        return response.status(204).json();
    },
    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const diskStorage = new DiskStorageProvider();
        const deleteOrphanage = new DeleteOrphanageService(diskStorage);

        await deleteOrphanage.execute({ id });

        return response.json();
    }
};
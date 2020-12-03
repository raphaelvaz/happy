import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import path from 'path';
import fs from 'fs';

import Orphanage from '../models/Orphanage';
import Image from '../models/Image';
import OrphanageView from '../views/orphanages_view';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';

import CreateOrphanageService from '../services/CreateOrphanageService';
import DiskStorageProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';

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

        const diskStorage = new DiskStorageProvider();
        const createOrphanage = new CreateOrphanageService(diskStorage);

        const createdOrphanage = await createOrphanage.execute({ images, orphanage });

        return response.status(201).json(createdOrphanage);
    },
    async update(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            accepted,
        } = request.body;

        const { id } = request.params;

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const orphanage = await orphanagesRepository.findOne(id);

        if (!orphanage) throw new AppError("Orphanage not found.");

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

        OldImages.forEach(async (oldImage) => {
            const filePath = path.resolve(uploadConfig.uploadPath, oldImage.path);
            try {
                await fs.promises.stat(filePath);
            } catch {
                return;
            }
            await fs.promises.unlink(filePath);
        });

        const newImages = images.map(newImage => {
            const createdImage = imagesRepository.create({
                orphanage,
                path: newImage.path,
            });

            return createdImage;
        })

        await imagesRepository.save(newImages);

        return response.status(204).json();
    },
    async delete(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const imagesRepository = getRepository(Image);
        const { id } = request.params;

        const orphanage = await orphanagesRepository.findOne(id);

        if (!orphanage) throw new AppError("Orphanage not found");

        const OldImages = await imagesRepository.find({
            where: {
                orphanage,
            }
        });

        OldImages.forEach(async (oldImage) => {
            const filePath = path.resolve(uploadConfig.uploadPath, oldImage.path);
            try {
                await fs.promises.stat(filePath);
            } catch {
                return;
            }
            await fs.promises.unlink(filePath);
        });

        await orphanagesRepository.remove(orphanage);

        return response.json();
    }
};
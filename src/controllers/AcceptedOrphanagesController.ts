import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: {
                accepted: true,
            }
        });

        return response.json(OrphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        try {
            const orphanage = await orphanagesRepository.findOneOrFail(id, {
                relations: ['images'],
                where: {
                    accepted: true,
                }
            });

            return response.json(OrphanageView.render(orphanage));
        } catch {
            throw new AppError("Orphanage not found");
        }
    },
};
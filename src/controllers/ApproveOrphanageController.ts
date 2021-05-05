import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Orphanage from '../models/Orphanage';

export default {
    async update(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const { id } = request.params;

        const orphanage = await orphanagesRepository.findOne(id);

        if (!orphanage) throw new AppError("Orphanage not found.");

        orphanage.accepted = true;

        await orphanagesRepository.save(orphanage);

        return response.status(204).json();
    }
}
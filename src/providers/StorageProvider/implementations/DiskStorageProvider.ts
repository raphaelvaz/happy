import IStorageProvider from '../models/IStorageProvider';
import fs from 'fs';
import path from 'path';

import uploadConfig from '../../../config/upload';

export default class DiskStorageProvider implements IStorageProvider {
    public async save(file: string): Promise<string> {
        return file;
    }

    public async delete(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadPath, file);
        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);

    }
}
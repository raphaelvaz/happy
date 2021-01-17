import IStorageProvider from '../models/IStorageProvider';
import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '../../../config/upload';

export default class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-2',
        });
    }

    public async save(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.uploadPath, file);

        const ContentType = mime.getType(originalPath);

        if (!ContentType) throw new Error('File not found');

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client.putObject({
            Bucket: 'happyapp',
            Key: file,
            ACL: 'public-read',
            Body: fileContent, ContentType,
        }).promise();

        await fs.promises.unlink(originalPath);

        return file;
    }

    public async delete(file: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: 'happyapp',
            Key: file,
        }).promise();
    }
}
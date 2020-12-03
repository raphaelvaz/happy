import multer from 'multer';
import path from 'path';

export default {
    uploadPath: path.join(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'tmp'),
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            cb(null, fileName);
        },
    })
}
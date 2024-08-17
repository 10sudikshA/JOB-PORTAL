

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const fileExtension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${fileExtension}`);
  },
});

export const singleUpload = multer({ storage }).single('file');

 // New multer configuration with a different name
const newStorage = multer.memoryStorage();

export const memoryUpload = multer({ storage: newStorage }).single('file');

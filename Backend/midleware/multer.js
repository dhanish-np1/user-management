import multer from 'multer';
import fs from 'fs'
import path from 'path';


const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, "./hello");        
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
  
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error("Invalid image type");
      if (isValid) {
        uploadError = null;
      }
  
      cb(uploadError, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
const uploadOptions = multer({ storage: storage });

 export { uploadOptions };
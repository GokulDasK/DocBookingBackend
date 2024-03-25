import multer from 'multer';
import express from 'express';

const app = express.Router();
app.use(express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post('/', upload.single('file'), (req, res) => {
  res.status(200).json({ url: `http://localhost:3000/${req.file.filename}` });
});


export default app;

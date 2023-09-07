import {checkAuth} from "../utils/checkAuth.js";
import express from 'express';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({storage});

router.post('/', checkAuth, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(500).json({message: 'No file uploaded'});
        }

        return res.json({
            url: `/uploads/${req.file.originalname}`
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;

import express from 'express';
import {loginValidation, registerValidation} from "../utils/validations.js";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import {User} from "../models/User.js";
import jwt from "jsonwebtoken";
import {checkAuth} from "../utils/checkAuth.js";
import {handleValidationErrors} from '../utils/handleValidationErrors.js';

const router = express.Router();

router.post('/register', registerValidation, handleValidationErrors, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const {password, email, fullName, avatarUrl} = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new User({
            email,
            passwordHash,
            fullName,
            avatarUrl
        });

        const user = await doc.save();

        const token = jwt.sign({
                _id: user._id
            },
            'secret',
            {
                expiresIn: '20d'
            })

        return res.status(201).json({
            ...user._doc,
            token,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.post('/login', loginValidation, handleValidationErrors, async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPassword) {
            return res.status(400).json({message: 'Incorrect password or login'})
        }

        const token = jwt.sign({
                _id: user._id
            },
            'secret',
            {
                expiresIn: '20d'
            })

        return res.status(201).json({
            ...user._doc,
            token,
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.get('/me', checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json(user._doc);

    } catch (err) {
        res.status(500).json({
            message: 'Account not found!'
        });
    }
});

export default router;

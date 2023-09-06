import express from 'express';
import {checkAuth} from "../utils/checkAuth.js";
import {User} from "../models/User.js";

const router = express.Router();

router.put('/fullName', checkAuth, async (req, res) => {
    try {
        const {fullName} = req.body;

        if (!fullName) {
            return res.status(400).json({message: 'Full name is required'});
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        user.fullName = fullName;

        await user.save();

        return res.status(200).json({message: 'fullName updated successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: err.message});
    }
});

router.delete('/', checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        await user.deleteOne();

        return res.status(200).json({message: 'User deleted successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: err.message});
    }
});

export default router;

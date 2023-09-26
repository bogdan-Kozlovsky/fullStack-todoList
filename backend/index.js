import express from 'express';
import {MONGO_DB_URL, PORT} from './config.js';
import mongoose from "mongoose";
import todolistRoute from './routes/todoListRoute.js';
import taskRoute from './routes/taskRoute.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import uploadAvatar from './routes/uploadAvatarRoute.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/todolist', todolistRoute);
app.use('/task', taskRoute);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/upload', uploadAvatar);

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    return res.status(200).send('Hello node.js');
});

mongoose.connect(MONGO_DB_URL)
    .then(() => {
        console.log('DB connect')
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        })
    })
    .catch((error) => console.log(error, 'DB error connect'))

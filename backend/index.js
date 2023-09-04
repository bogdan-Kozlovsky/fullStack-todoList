import express from 'express';
import {MONGO_DB_URL, PORT} from './config.js';
import mongoose from "mongoose";
import todolistRoute from './routes/todoListRoute.js';
import taskRoute from './routes/taskRoute.js';

const app = express();

app.use(express.json());
app.use('/todolist', todolistRoute);
app.use('/todolist', taskRoute);

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

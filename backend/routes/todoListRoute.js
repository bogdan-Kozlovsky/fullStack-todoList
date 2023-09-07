import {TodoList} from "../models/TodoList.js";
import mongoose from "mongoose";
import express from "express";
import {checkAuth} from "../utils/checkAuth.js";

const router = express.Router();

router.post('/', checkAuth, async (req, res) => {
    try {
        const {name} = req.body;

        if (!name) {
            return res.status(500).send({message: 'Send all required fields: name'});
        }

        const newTodoList = {
            name,
            tasks: [],
            authorTodoList: req.userId
        }

        const todoList = await TodoList.create(newTodoList);

        return res.status(201).send(todoList);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const todoLists = await TodoList.find({}).populate('tasks');

        return res.status(200).json(todoLists);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.put('/:id', checkAuth, async (req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;

        if (!name) {
            return res.status(400).send({message: 'Send all required fields: name'});
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({message: 'Invalid TodoList ID'});
        }

        const updatedTodoList = await TodoList.findByIdAndUpdate(id, req.body);

        if (!updatedTodoList) {
            return res.status(404).json({message: 'TodoList not found'});
        }

        return res.status(200).send({message: 'TodoList updated successfully'});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Invalid TodoList ID'});
        }

        const result = await TodoList.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({message: 'TodoList not found'});
        }

        return res.status(200).send({message: 'TodoList successfully deleted'});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;

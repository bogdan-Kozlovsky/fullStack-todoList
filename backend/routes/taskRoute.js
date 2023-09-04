import mongoose from "mongoose";
import {TodoList} from "../models/TodoList.js";
import {Task} from "../models/Task.js";
import express from "express";

const router = express.Router();

router.post('/:todoListId/task', async (req, res) => {
    try {
        const {todoListId} = req.params;
        const {name, description, completed} = req.body;

        if (!mongoose.Types.ObjectId.isValid(todoListId)) {
            return res.status(400).json({message: 'Invalid TodoList ID'});
        }

        const todoList = await TodoList.findById(todoListId);

        if (!todoList) {
            return res.status(404).json({message: 'TodoList not found'});
        }

        const newTask = new Task({
            name,
            description,
            completed
        });

        await newTask.save();

        todoList.tasks.push(newTask);
        await todoList.save();

        return res.status(200).json(newTask)

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.delete('/:todoListId/task/:taskId', async (req, res) => {
    try {
        const {todoListId, taskId} = req.params;

        if (!mongoose.Types.ObjectId.isValid(todoListId) || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({message: 'Invalid TodoList ID or Task ID'});
        }

        const todoList = await TodoList.findById(todoListId);

        if (!todoList) {
            return res.status(404).json({message: 'TodoList not found'});
        }

        const taskIndex = todoList.tasks.indexOf(taskId);
        if (taskIndex === -1) {
            return res.status(404).json({message: 'Task not found in TodoList'})
        }

        todoList.tasks.splice(taskIndex, 1);
        await todoList.save();

        await Task.findByIdAndDelete(taskId);

        return res.status(200).json({message: 'Task successfully deleted from TodoList'});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.put('/:todoListId/task/:taskId', async (req, res) => {
    try {
        const {todoListId, taskId} = req.params;
        const {name, description, completed} = req.body;

        if (!mongoose.Types.ObjectId.isValid(todoListId) || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({message: 'Invalid TodoList ID or Task ID'});
        }

        if (!name) {
            return res.status(400).send({message: 'Send all required fields: name description'});
        }

        const todoList = await TodoList.findById(todoListId);
        if (!todoList) {
            return res.status(404).json({message: 'TodoList not found'});
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        if (name) task.name = name;
        if (description) task.description = description;
        if (completed) task.completed = completed;

        await task.save();

        return res.status(200).json({message: 'Task updated successfully'});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.changeStatus = exports.fetchTasks = exports.createTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const createTasks = async (req, res) => {
    try {
        const { _id, title, description } = req.body;
        const newTask = new Task_1.default({ _id, title, description, status: 'pending' });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error('An unknown error occurred');
        }
        res.status(500).send('Server Error');
    }
};
exports.createTasks = createTasks;
const fetchTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.find();
        res.status(200).json(tasks);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error('An unknown error occurred');
        }
        res.status(500).send('Server Error');
    }
};
exports.fetchTasks = fetchTasks;
const changeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    await Task_1.default.findByIdAndUpdate(id, { status });
    res.status(200).json({ message: 'Task status updated successfully' });
};
exports.changeStatus = changeStatus;
const deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task_1.default.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
};
exports.deleteTask = deleteTask;

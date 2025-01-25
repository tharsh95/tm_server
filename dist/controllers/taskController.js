"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.changeStatus = exports.fetchTasks = exports.createTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const createTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newTask = new Task_1.default({ title, description, status: 'pending' });
        yield newTask.save();
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
});
exports.createTasks = createTasks;
const fetchTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
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
});
exports.fetchTasks = fetchTasks;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    yield Task_1.default.findByIdAndUpdate(id, { status });
    res.status(200).json({ message: 'Task status updated successfully' });
});
exports.changeStatus = changeStatus;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Task_1.default.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
});
exports.deleteTask = deleteTask;

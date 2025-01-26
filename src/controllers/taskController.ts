import Task from "../models/Task";
import { Request, Response } from 'express';

export const createTasks = async (req: Request, res: Response) => {
    try {
        const { _id,title, description } = req.body;
        const newTask = new Task({_id, title, description, status: 'pending' });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error('An unknown error occurred');
        }
        res.status(500).send('Server Error');
    }
}

export const fetchTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error('An unknown error occurred');
        }
        res.status(500).send('Server Error');
    }
}
export const changeStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
   await Task.findByIdAndUpdate(id, { status });
   res.status(200).json({ message: 'Task status updated successfully' });
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
}
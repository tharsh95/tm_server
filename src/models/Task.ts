
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in progress", "completed"],
    },
    });
    const Task = mongoose.model("task", taskSchema);
    export default Task;
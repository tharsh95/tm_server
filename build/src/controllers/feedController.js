"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeed = exports.createFeed = void 0;
const feed_1 = __importDefault(require("../models/feed"));
const createFeed = async (req, res, next) => {
    try {
        const { url, description, createdAt } = req.body;
        if (!req.user) {
            res.status(400).json({ message: 'User not authenticated' });
            return; // Ensure the function ends here
        }
        const { email } = req.user;
        const feed = new feed_1.default({ url, description, user: email, createdAt });
        await feed.save();
        res.status(201).json({ message: 'Feed successfully created' });
    }
    catch (error) {
        next(error); // Pass error to the centralized error handler
    }
};
exports.createFeed = createFeed;
const getFeed = async (req, res, next) => {
    try {
        const data = await feed_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(data);
    }
    catch (error) {
        next(error); // Pass error to the centralized error handler
    }
};
exports.getFeed = getFeed;

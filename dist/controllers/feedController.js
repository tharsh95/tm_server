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
exports.getFeed = exports.createFeed = void 0;
const feed_1 = __importDefault(require("../models/feed"));
const createFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, description, createdAt } = req.body;
        const { email } = req.user;
        const feed = new feed_1.default({ url, description, user: email, createdAt });
        yield feed.save();
        res.status(201).json({ message: 'Feed successfully created' });
    }
    catch (error) {
        next(error); // Passes errors to the centralized error handler
    }
});
exports.createFeed = createFeed;
const getFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield feed_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(data);
    }
    catch (error) {
        next(error); // Passes errors to the centralized error handler
    }
});
exports.getFeed = getFeed;

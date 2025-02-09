"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const taskRouter_1 = __importDefault(require("./routes/taskRouter"));
const feedRouter_1 = __importDefault(require("./routes/feedRouter"));
const router = (0, express_1.Router)();
// Register all route modules here
router.use('/auth', authRouter_1.default);
router.use('/task', taskRouter_1.default);
router.use('/feed', feedRouter_1.default);
exports.default = router;

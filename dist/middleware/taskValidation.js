"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const taskValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(3).max(100).required(),
        description: joi_1.default.string().required(),
        status: joi_1.default.string().valid('pending', 'in progress', 'completed')
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};
exports.taskValidation = taskValidation;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const feedValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        url: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        createdAt: joi_1.default.date().iso().required(),
        user: joi_1.default.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
};
exports.feedValidation = feedValidation;

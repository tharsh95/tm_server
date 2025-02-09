"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpValidation = exports.emailValidation = exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const registerValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(100).required(),
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
};
exports.registerValidation = registerValidation;
const loginValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        // Respond with a 400 status if validation fails
        res.status(400).send(error.details[0].message);
        return; // Ensure the function exits after sending the response
    }
    // Pass control to the next middleware/route handler
    next();
};
exports.loginValidation = loginValidation;
const emailValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        // Respond with a 400 status if validation fails
        res.status(400).send(error.details[0].message);
        return; // Ensure the function exits after sending the response
    }
    // Pass control to the next middleware/route handler
    next();
};
exports.emailValidation = emailValidation;
const otpValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
        otp: joi_1.default.string()
            .length(4) // Ensure the OTP is exactly 4 characters
            .pattern(/^\d{4}$/) // Ensure the OTP is numeric
            .required(), // Make it required
    });
    const { error } = schema.validate(req.body);
    if (error) {
        // Respond with a 400 status if validation fails
        res.status(400).send(error.details[0].message);
        return; // Ensure the function exits after sending the response
    }
    // Pass control to the next middleware/route handler
    next();
};
exports.otpValidation = otpValidation;

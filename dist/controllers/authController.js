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
exports.changePassword = exports.verifyOtp = exports.sendMail = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const mail_1 = require("../services/mail");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (user) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }
        const newUser = new User_1.default({ name, email, password });
        newUser.password = yield bcrypt_1.default.hash(password, 10);
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully' });
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
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(403).json({ message: 'User does not exist', token: null, email: null, name: null });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(403).json({ message: 'Invalid credentials' });
            return;
        }
        const jwtToken = jsonwebtoken_1.default.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ message: 'Login successful', token: jwtToken, email, name: user.name });
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
exports.login = login;
const sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            console.log("user not found");
            res.status(404).json({ message: 'User does not exist' });
            return;
        }
        const otp = crypto_1.default.randomInt(1000, 10000);
        const hashedOtp = crypto_1.default.createHash('sha256').update(otp.toString()).digest('hex');
        user.otp = hashedOtp;
        yield user.save();
        (0, mail_1.mail)(email, "Otp Sent for password reset", otp.toString());
        res.status(200).json({ message: 'Mail sent successfully', email });
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
exports.sendMail = sendMail;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email } = req.body;
        const user = yield User_1.default.findOne({ email });
        const hotp = crypto_1.default.createHash('sha256').update(otp.toString()).digest('hex');
        if (user.otp.toString() === hotp) {
            user.otp = '';
            yield user.save();
            res.status(200).json({ message: 'OTP verified successfully', email });
        }
        else {
            console.log("Not Match");
            res.status(400).json({ message: 'Invalid OTP' });
        }
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
exports.verifyOtp = verifyOtp;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User does not exist' });
            return;
        }
        user.password = yield bcrypt_1.default.hash(password, 10);
        yield user.save();
        res.status(200).json({ message: 'Password reset successful', email });
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
exports.changePassword = changePassword;

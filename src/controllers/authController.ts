import User from "../models/User";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { mail } from "../services/mail";


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({ message: 'User already exists' });
            return
        }
        const newUser = new User({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
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
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(403).json({ message: 'User does not exist',token:null,email:null,name:null });
            return
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(403).json({ message: 'Invalid credentials' });
            return
        }
        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
        res.status(200).json({ message: 'Login successful', token: jwtToken, email, name: user.name });

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
export const sendMail = async (req: Request, res: Response) => { 
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if(!user){
            console.log("user not found")
            res.status(404).json({ message: 'User does not exist' });
            return
        }
        const otp = crypto.randomInt(1000, 10000);
        const hashedOtp = crypto.createHash('sha256').update(otp.toString()).digest('hex');
        user.otp = hashedOtp;
        await user.save();
        mail(email,"Otp Sent for password reset",otp.toString())

        res.status(200).json({ message: 'Mail sent successfully', email });
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
export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { otp, email } = req.body;
        const user = await User.findOne({ email })
       const hotp = crypto.createHash('sha256').update(otp.toString()).digest('hex');
        if (user.otp.toString() === hotp) {
            user.otp = '';
            await user.save();
            res.status(200).json({ message: 'OTP verified successfully', email });
        }
        else {
            console.log("Not Match")
            res.status(400).json({ message: 'Invalid OTP' });
        }
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

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User does not exist' });
            return
        }
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(200).json({ message: 'Password reset successful', email });
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
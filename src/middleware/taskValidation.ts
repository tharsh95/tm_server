import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const taskValidation = (req:Request, res:Response, next:NextFunction) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().required(),
        status: Joi.string().valid('pending', 'in progress', 'completed')
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
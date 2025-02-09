import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const feedValidation = (req:Request, res:Response, next:NextFunction) => {
    const schema = Joi.object({
        url: Joi.string().required(),
        description: Joi.string().required(),
        createdAt:Joi.date().iso().required(),
        user:Joi.string().required()

    });
    const { error } = schema.validate(req.body);
    if (error) {
         res.status(400).send(error.details[0].message);
         return
    }
    next();
}
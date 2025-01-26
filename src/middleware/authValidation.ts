import { NextFunction, Request, Response } from "express";
import Joi from "joi";
export const registerValidation = (req:Request,res:Response,next:NextFunction)=> {
    const schema=Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    next();
    return null
}

export const loginValidation = (req:Request,res:Response,next:NextFunction) => {
    const schema=Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    next();
    return null
}
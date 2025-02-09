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
         res.status(400).send(error.details[0].message);
         return
    }
    next();
}

export const loginValidation = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
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
export const emailValidation = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
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

  export const otpValidation = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
      otp: Joi.string()
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
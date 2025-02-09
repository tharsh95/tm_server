import { Router } from "express";
import { changePassword, login, register, sendMail, verifyOtp } from "../controllers/authController";
import { emailValidation, loginValidation, otpValidation, registerValidation } from "../middleware/authValidation";

const router = Router();

router.post("/login",loginValidation, login);
router.post("/register",registerValidation, register) 
router.post("/sendOtp",emailValidation, sendMail)
router.post("/verifyOtp",otpValidation, verifyOtp)
router.post("/resetPassword",changePassword)

export default router;


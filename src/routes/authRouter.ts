import { Router } from "express";
import { changePassword, login, register, sendMail, verifyOtp } from "../controllers/authController";
import { loginValidation, registerValidation } from "../middleware/authValidation";

const router = Router();

router.post("/login",loginValidation, login);
router.post("/register",registerValidation, register) 
router.post("/sendOtp",sendMail)
router.post("/verifyOtp",verifyOtp)
router.post("/resetPassword",changePassword)

export default router;


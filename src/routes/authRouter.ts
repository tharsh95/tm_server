import { Router } from "express";
import { changePassword, login, register, sendMail, verifyOtp } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/register", register) 
router.post("/sendOtp",sendMail)
router.post("/verifyOtp",verifyOtp)
router.post("/resetPassword",changePassword)

export default router;


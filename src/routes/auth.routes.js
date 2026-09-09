import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { updateProfileValidations } from "../middlewares/validations/profile.validations.js";
import { applyValidations } from "../middlewares/validator.js";
import { createUserValidations } from "../middlewares/validations/user.validations.js";

const authRouter = Router();

authRouter.post("/api/auth/register", createUserValidations, applyValidations, register);
authRouter.post("/api/auth/login", login);
authRouter.get("/api/auth/profile", authMiddleware, getProfile);
authRouter.put("/api/auth/profile", authMiddleware, updateProfileValidations, applyValidations, updateProfile);
authRouter.post("/api/auth/logout", authMiddleware, logout);

export default authRouter;
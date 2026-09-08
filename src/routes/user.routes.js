import { Router } from "express";
import { authAdminMiddleware } from "../middlewares/adminMiddleware.js";
import { deleteUser,getAllUsers,getUser,updateUser,} from "../controllers/user.controller.js";
import { deleteUserValidations,getUserValidations,updateUerValidations,} from "../middlewares/validate/user.validation.js";
import { applyValidations } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/api/users", authMiddleware, authAdminMiddleware, getAllUsers);
userRouter.get("/api/users/:id",authMiddleware,authAdminMiddleware,getUserValidations,applyValidations,getUser);
userRouter.put("/api/users/:id",authMiddleware,authAdminMiddleware,updateUerValidations,applyValidations,updateUser);
userRouter.delete("/api/users/:id",authMiddleware,authAdminMiddleware,deleteUserValidations,applyValidations,deleteUser);

export default userRouter;
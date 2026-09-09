import { Router } from "express";
import { authAdminMiddleware } from "../middlewares/adminMiddleware.js";
import { deleteUser,getAllUsers,createUser,updateUser,} from "../controllers/user.controller.js";
import { deleteUserValidations,getUserValidations,updateUerValidations,} from "../middlewares/validations/user.validations.js";
import { applyValidations } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/api/users", authMiddleware, authAdminMiddleware, getAllUsers);
userRouter.get("/api/users/:id",authMiddleware,authAdminMiddleware,getUserValidations,applyValidations,createUser);
userRouter.put("/api/users/:id",authMiddleware,authAdminMiddleware,updateUerValidations,applyValidations,updateUser);
userRouter.delete("/api/users/:id",authMiddleware,authAdminMiddleware,deleteUserValidations,applyValidations,deleteUser);

export default userRouter;
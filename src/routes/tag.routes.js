import { Router } from "express";
import { authAdminMiddleware } from "../middlewares/adminMiddleware.js";
import { createTagValidations,deleteTagValidations,getTagValidations,updateTagValidations,} from "../middlewares/validations/tag.validations.js";
import { applyValidations } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { addTagToArticle,deleteTag,getAllTags,getTagById,updateTag,} from "../controllers/tag.controller.js";

const tagRouter = Router();

tagRouter.post("/api/tags",authMiddleware,authAdminMiddleware,createTagValidations,applyValidations,addTagToArticle);
tagRouter.get("/api/tags", authMiddleware, getAllTags);
tagRouter.get("/api/tags/:id",authMiddleware,authAdminMiddleware,getTagValidations,applyValidations,getTagById);
tagRouter.put("/api/tags/:id",authMiddleware,authAdminMiddleware,updateTagValidations,applyValidations,updateTag);
tagRouter.delete("/api/tags/:id",authMiddleware,authAdminMiddleware,deleteTagValidations,applyValidations,deleteTag);

export default tagRouter;
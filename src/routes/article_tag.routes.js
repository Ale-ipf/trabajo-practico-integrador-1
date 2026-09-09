import { Router } from "express";
import { authAuthorMiddleware } from "../middlewares/ownerMiddleware.js";
import { createArticleTagValidations, delteArticleTagValidations } from "../middlewares/validations/article_tag.validations.js";
import { applyValidations } from "../middlewares/validator.js";
import { createArticleTag, deleteArticleTag } from "../controllers/article_tag.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const articleTagsRouter = Router();

articleTagsRouter.post( "/api/articles-tags", authMiddleware, authAuthorMiddleware,
createArticleTagValidations, applyValidations, createArticleTag);

articleTagsRouter.delete("/api/articles-tags/:articleTagId", authMiddleware, authAuthorMiddleware,
delteArticleTagValidations, applyValidations, deleteArticleTag);

export default articleTagsRouter;
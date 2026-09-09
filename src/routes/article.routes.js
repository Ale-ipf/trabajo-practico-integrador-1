import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { createArticleValidations, getArticleValidations, updateArticleValidations } from "../middlewares/validations/article.validations.js";
import { createArticle, deleteArticle, getAllArticles, getArticle, getArticleUser, getArticleUserById, updateArticle } from "../controllers/article.controller.js";
import { ownerAdminMiddleware } from "../middlewares/ownerAdminMiddleware.js";
import { applyValidations } from "../middlewares/validator.js";

const articleRouter = Router();

articleRouter.post("/api/articles", authMiddleware, createArticleValidations, applyValidations, createArticle);
articleRouter.get("/api/articles", authMiddleware, getAllArticles);
articleRouter.get("/api/articles/:id", authMiddleware, getArticleValidations, applyValidations, getArticle);
articleRouter.get("/api/articles/user", authMiddleware, getArticleUser);
articleRouter.get("/api/articles/user/:id", authMiddleware,getArticleValidations, applyValidations, getArticleUserById);
articleRouter.put("/api/articles/:id", authMiddleware, ownerAdminMiddleware, updateArticleValidations, applyValidations, updateArticle);
articleRouter.delete("/api/articles/:id", authMiddleware, ownerAdminMiddleware, getArticleValidations, applyValidations, deleteArticle);

export default articleRouter;
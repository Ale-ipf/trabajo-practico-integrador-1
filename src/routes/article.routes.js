import { Router } from "express";
import { createArticle, getAllArticles, getArticleById, getArticleByUser, getArticleByUserId, updateArticle } from "../controllers/article.controller.js";
import { createArticleValidation } from "../middlewares/validate/article.validation.js";
import { validate } from "../middlewares/validate.js";

export const articleRouter = Router();

articleRouter.post("/articles", createArticleValidation, validate, createArticle);
articleRouter.get("/articles", getAllArticles);
articleRouter.get("/articles/:id", getArticleById);
articleRouter.get("/articles/user", getArticleByUser);
articleRouter.get("/articles/user/:id", getArticleByUserId);
articleRouter.put("/article/:id", updateArticle);
//userRouter.delete("/article/:id", deleteArticle);
import { Article } from "../models/article.model.js";

export const ownerAdminMiddleware = async (req, res, next) => {
  const userLogged = req.userLogged;

  if (Article.user_id !== userLogged.id && userLogged.role !== "admin") {
    return res.status(403).json({
      message: "You cannot access this resourse",
    });
  }

  next();
};
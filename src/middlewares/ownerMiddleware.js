import { Article } from "../models/article.model.js";

export const authAuthorMiddleware = async (req, res, next) => {
  const userLogged = req.userLogged;

  const article = await Article.findOne({
    where: { user_id: userLogged.id, id: req.body.article_id },
  });

  if (!article) {
    return res.status(403).json({
      message: "You cannot access this source",
    });
  }

  next();
};
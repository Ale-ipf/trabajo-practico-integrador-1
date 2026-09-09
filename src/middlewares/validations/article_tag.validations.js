import { body,param } from "express-validator";
import { Article } from "../../models/article.model.js";
import { Tag } from "../../models/tag.model.js";
import { ArticleTag } from "../../models/article_tag.model.js";

//VALIDACIONES PARA CREAR UN REGISTRO EN LA TABLA INTERMEDIA
export const createArticleTagValidations = [
  body('article_id')
    .trim()
    .notEmpty()
    .withMessage("The article_id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("The article_id must be a number greater than 0")
    .custom(async (article_id, { req }) => {
      try {
        const article = await Article.findOne({
          where: { id: req.body.article_id },
        });

        if (!article) {
          return Promise.reject(
            "There is no article in the DB with that id, try another one"
          );
        }
      } catch (err) {
        console.error("Error checking the existency of the article by id", err);
        return Promise.reject(
          "Error checking the existency of the article by id"
        );
      }
    }),
  body('tag_id')
    .trim()
    .notEmpty()
    .withMessage("The tag_id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("The tag_id must be a number greater than 0")
    .custom(async (tag_id, { req }) => {
      try {
        const tag = await Tag.findOne({ where: { id: req.body.tag_id } });

        if (!tag) {
          return Promise.reject(
            "There is no tag in the DB with that id, try another one"
          );
        }
      } catch (err) {
        console.error("Error checking the existency of the tag by id", err);
        return Promise.reject("Error checking the existency of the tag by id");
      }
    }),
];

//VALIDACIONES PARA ELIMINAR UN REGISTRO EN LA TABLA INTERMEDIA
export const delteArticleTagValidations = [
  param("articleTagId")
    .isInt({ gt: 0 })
    .withMessage("The articleTagId must be a number greater than 0")
    .custom(async (delteArticleTagValidations, { req }) => {
      try {
        const articleTag = await ArticleTag.findOne({
          where: { id: req.params.articleTagId },
        });

        if (!articleTag) {
          return Promise.reject(
            "There is no register in the DB with that id, try another one"
          );
        }
      } catch (err) {
        console.error(
          "Error checking the existency of the register by articleTagId",
          err
        );
        return Promise.reject(
          "Error checking the existency of the register by articleTagId"
        );
      }
    }),
];
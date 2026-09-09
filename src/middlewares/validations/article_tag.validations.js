import { body,param } from "express-validator";
import { Article } from "../../models/article.model.js";
import { Tag } from "../../models/tag.model.js";
import { ArticleTag } from "../../models/article_tag.model.js";

//VALIDACIONES PARA CREAR UN REGISTRO EN LA TABLA INTERMEDIA
export const createArticleTagValidations = [
  body('article_id')
    .trim()
    .notEmpty()
    .withMessage("El article_id no puede estar vacío")
    .isInt({ gt: 0 })
    .withMessage("El article_id debe ser un número mas grande que 0")
    .custom(async (article_id, { req }) => {
      try {
        const article = await Article.findOne({
          where: { id: req.body.article_id },
        });

        if (!article) {
          return Promise.reject(
            "No se encuentra artículo en la base de datos con ese id, intenta con otro"
          );
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(
          "Error revisando la existencia del artículo por id"
        );
      }
    }),
  body('tag_id')
    .trim()
    .notEmpty()
    .withMessage("El tag_id no puede estar vacío")
    .isInt({ gt: 0 })
    .withMessage("El tag_id debe ser un número mas grande que 0")
    .custom(async (tag_id, { req }) => {
      try {
        const tag = await Tag.findOne({ where: { id: req.body.tag_id } });

        if (!tag) {
          return Promise.reject(
            "No se encuentra la etiqueta en la base de datos con ese id, intenta con otro"
          );
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la existencia de la etiqueta por id");
      }
    }),
];

//VALIDACIONES PARA ELIMINAR UN REGISTRO EN LA TABLA INTERMEDIA
export const delteArticleTagValidations = [
  param("articleTagId")
    .isInt({ gt: 0 })
    .withMessage("El articleTagId debe ser un número mas grande que 0")
    .custom(async (delteArticleTagValidations, { req }) => {
      try {
        const articleTag = await ArticleTag.findOne({
          where: { id: req.params.articleTagId },
        });

        if (!articleTag) {
          return Promise.reject(
            "No se encuentra el registro en la base de datos con ese id, intenta con otro"
          );
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(
          "Error revisando la existencia del registro by articleTagId"
        );
      }
    }),
];
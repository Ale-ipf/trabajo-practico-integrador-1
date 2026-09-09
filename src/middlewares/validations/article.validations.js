import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";
import { Op } from "sequelize";
import { Article } from "../../models/article.model.js";

//VALIDACIONES PARA CREAR UN ARTÍCULO
export const createArticleValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 200 })
    .withMessage(
      "Title must contain at least 3 characters and a maximum of 200"
    ),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isLength({ min: 50 })
    .withMessage("Content must contain at least 50 characters"),
  body("excerpt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Excerpt cannot be empty")
    .isLength({ max: 500 })
    .withMessage("Excerpt cannot exceed 500 characters"),
  body("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .isIn(["published", "archived"])
    .withMessage("Status must be either 'published' or 'archived0'"),
];

//VALIDACIÓN PARA TRSER UN SOLO ARTÍCULO POR SU ID
export const getArticleValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than zero")
    .custom(async (id, { req }) => {
      try {
        const article = await Article.findOne({
          where: { id: req.params.id },
        });

        if (!article) {
          return Promise.reject("There is no article in the DB with that ID");
        }
      } catch (err) {
        console.error("Error checking the existency of the article by id", err);
        return Promise.reject(
          "Error checking the existency of the article by id"
        );
      }
    }),
];

//VALIDACIÓN PARA LISTAR LOS ARETÍCULOS DEL USUARIO LOGUEADO POR ID
export const getArticleUserById = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const userLogged = req.userLogged;

        const articleExisting = await Article.findOne({
          where: { id: req.params.id, user_id: userLogged.id },
        });

        if (!articleExisting) {
          return Promise.reject("There is no article in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the user by id", err);
        return Promise.reject("Error checking the existency of the user by id");
      }
    }),
];

//VALIDACIONES PARA ACTUALIZAR UN ARTÍCULO
export const updateArticleValidations = [
  //PARAM
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than zero")
    .custom(async (id, { req }) => {
      try {
        const article = await Article.findOne({
          where: { id: req.params.id },
        });

        if (!article) {
          return Promise.reject("There is no article in the DB with that ID");
        }
      } catch (err) {
        console.error("Error checking the existency of the article by id", err);
        return Promise.reject(
          "Error checking the existency of the article by id"
        );
      }
    }),
  //BODY
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 200 })
    .withMessage(
      "Title must contain at least 3 characters and a maximum of 200"
    ),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isLength({ min: 50 })
    .withMessage("Content must contain at least 50 characters"),
  body("excerpt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Excerpt cannot be empty")
    .isLength({ max: 500 })
    .withMessage("Excerpt cannot exceed 500 characters"),
  body("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .isIn(["published", "archived"])
    .withMessage("Status must be either 'published' or 'archived'"),
];
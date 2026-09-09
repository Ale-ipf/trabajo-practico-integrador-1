import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";
import { Op } from "sequelize";
import { Article } from "../../models/article.model.js";

//VALIDACIONES PARA CREAR UN ARTÍCULO
export const createArticleValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe contener al menos 3 caracteres y un maximo de 200"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El contenido no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("El contenido debe contener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El extracto no puede estar vacío")
    .isLength({ max: 500 })
    .withMessage("El extracto no puede exceder los 500 caracteres"),
  body("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El estado no puede estar vacío")
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser o bien 'published' or 'archived'"),
];

//VALIDACIÓN PARA TRSER UN SOLO ARTÍCULO POR SU ID
export const getArticleValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("La id debe ser un número mas grande que cero")
    .custom(async (id, { req }) => {
      try {
        const article = await Article.findOne({
          where: { id: req.params.id },
        });

        if (!article) {
          return Promise.reject("There is no article in the DB with that ID");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(
          "Error revisando la existencia del artículo por id"
        );
      }
    }),
];

//VALIDACIÓN PARA LISTAR LOS ARETÍCULOS DEL USUARIO LOGUEADO POR ID
export const getArticleUserById = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("La id debe ser un número mas grande que 0")
    .custom(async (id, { req }) => {
      try {
        const userLogged = req.userLogged;

        const articleExisting = await Article.findOne({
          where: { id: req.params.id, user_id: userLogged.id },
        });

        if (!articleExisting) {
          return Promise.reject("No se encuentra artículo en la base de datos con ese id");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la existencia del usuario por id");
      }
    }),
];

//VALIDACIONES PARA ACTUALIZAR UN ARTÍCULO
export const updateArticleValidations = [
  //PARAM
  param("id")
    .isInt({ gt: 0 })
    .withMessage("La id debe ser un número mas grande que cero")
    .custom(async (id, { req }) => {
      try {
        const article = await Article.findOne({
          where: { id: req.params.id },
        });

        if (!article) {
          return Promise.reject("No se encuentra artículo en la base de datos con ese ID");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(
          "Error revisando la existencia del artículo por id"
        );
      }
    }),
  //BODY
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage(
      "El título debe contener al menos 3 caracteres y un maximo de 200"
    ),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El contenido no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("El contenido debe contener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El extracto no puede estar vacío")
    .isLength({ max: 500 })
    .withMessage("El extracto no puede exceder los 500 caracteres"),
  body("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El estado no puede estar vacío")
    .isIn(["published", "archived"])
    .withMessage("El estado debe o bien 'published' or 'archived'"),
];
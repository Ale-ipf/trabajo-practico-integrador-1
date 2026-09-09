import { body, param } from "express-validator";
import { Tag } from "../../models/tag.model.js";

export const createTagValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe contener al menos 2 caracteres y un máximo de 30")
    .matches(/^(?=.*[A-Za-z])(?!.*\s)[A-Za-z]+$/)
    .custom(async (name, { req }) => {
      try {
        const nameExisting = await Tag.findOne({
          where: { name: req.body.name },
        });

        if (nameExisting) {
          return Promise.reject("Ya hay un tag con ese nombre");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la viabilidad del nombre");
      }
    }),
];

//VALIDACIONES PARA TRAER UNA SOLA TAG
export const getTagValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un número mas grande que cero")
    .custom(async (id, { req }) => {
      try {
        const tag = await Tag.findOne({
          where: { id: req.params.id },
        });

        if (!tag) {
          return Promise.reject("No se encuentra etiqueta en la base de datos con ese ID");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la existencia de la etiqueta por id");
      }
    }),
];

//VALIDACIONES PARA ACTUALIZAR UNA TAG
export const updateTagValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un número mas grande que cero")
    .custom(async (id, { req }) => {
      try {
        const tag = await Tag.findOne({
          where: { id: req.params.id },
        });

        if (!tag) {
          return Promise.reject("No se encuentra etiqueta en la base de datos con ese ID");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la existencia de la etiqueta por id");
      }
    }),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe contener al menos 2 caracteres y un máximo de 30")
    .matches(/^(?=.*[A-Za-z])(?!.*\s)[A-Za-z]+$/)
    .custom(async (name, { req }) => {
      try {
        const nameExisting = await Tag.findOne({
          where: { name: req.body.name },
        });

        if (nameExisting) {
          return Promise.reject("Ya hay un tag con ese nombre");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la viabilidad del nombre");
      }
    }),
];

//VALIDACIONES PARA ELIMINAR UNA TAG
export const deleteTagValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un número mas grande que cero")
    .custom(async (id, { req }) => {
      try {
        const tag = await Tag.findOne({
          where: { id: req.params.id },
        });

        if (!tag) {
          return Promise.reject("No se encuentra etiqueta en la base de datos con ese ID");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la existencia de la etiqueta por id");
      }
    }),
];
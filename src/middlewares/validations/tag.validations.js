import { body, param } from "express-validator";
import { Tag } from "../../models/tag.model.js";

export const createTagValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must contain at leas 2 characters and a maximum of 30")
    .matches(/^(?=.*[A-Za-z])(?!.*\s)[A-Za-z]+$/)
    .custom(async (name, { req }) => {
      try {
        const nameExisting = await TagModel.findOne({
          where: { name: req.body.name },
        });

        if (nameExisting) {
          return Promise.reject("There is already a tag with that name");
        }
      } catch (err) {
        console.error("Error checking the viability of the name", err);
        return Promise.reject("Error checking the viability of the name");
      }
    }),
];

//VALIDACIONES PARA TRAER UNA SOLA TAG
export const getTagValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than zero")
    .custom(async (id, { req }) => {
      try {
        const tag = await TagModel.findOne({
          where: { id: req.params.id },
        });

        if (!tag) {
          return Promise.reject("There is no tag in the DB with that ID");
        }
      } catch (err) {
        console.error("Error checking the existency of the tag by id", err);
        return Promise.reject("Error checking the existency of the tag by id");
      }
    }),
];

//VALIDACIONES PARA ACTUALIZAR UNA TAG
export const updateTagValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than zero")
    .custom(async (id, { req }) => {
      try {
        const tag = await TagModel.findOne({
          where: { id: req.params.id },
        });

        if (!tag) {
          return Promise.reject("There is no tag in the DB with that ID");
        }
      } catch (err) {
        console.error("Error checking the existency of the tag by id", err);
        return Promise.reject("Error checking the existency of the tag by id");
      }
    }),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must contain at leas 2 characters and a maximum of 30")
    .matches(/^(?=.*[A-Za-z])(?!.*\s)[A-Za-z]+$/)
    .custom(async (name, { req }) => {
      try {
        const nameExisting = await TagModel.findOne({
          where: { name: req.body.name },
        });

        if (nameExisting) {
          return Promise.reject("There is already a tag with that name");
        }
      } catch (err) {
        console.error("Error checking the viability of the name", err);
        return Promise.reject("Error checking the viability of the name");
      }
    }),
];

//VALIDACIONES PARA ELIMINAR UNA TAG
export const deleteTagValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than zero")
    .custom(async (id, { req }) => {
      try {
        const tag = await TagModel.findOne({
          where: { id: req.params.id },
        });

        if (!tag) {
          return Promise.reject("There is no tag in the DB with that ID");
        }
      } catch (err) {
        console.error("Error checking the existency of the tag by id", err);
        return Promise.reject("Error checking the existency of the tag by id");
      }
    }),
];
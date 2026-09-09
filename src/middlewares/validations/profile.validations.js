import { body } from "express-validator";

//VALIDACIONES PARA ACTUALIZAR UN PERFIL
export const updateProfileValidations = [
  body("first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First_name cannot be empty")
    .isString()
    .withMessage("First_name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "First_name must contain at least 5 characters and a maximum of 50"
    )
    .matches(/^[A-Za-z]+$/)
    .withMessage("First_name must contain only letters, not numbers or signs"),
  body("lastname")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Lastname cannot be empty")
    .isString()
    .withMessage("Lastname must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "Lastname must contain at least 5 characters and a maximum of 50"
    )
    .matches(/^[A-Za-z]+$/)
    .withMessage("Lastname must contain only letters, not numbers or signs"),
  body("biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Biography cannot be empty")
    .isString()
    .withMessage("Biography must be a string")
    .isLength({ max: 500 })
    .withMessage("Biography cannot exceed 500 characters"),
  body("avatar_url")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The avatar_url cannot be empty")
    .isURL()
    .withMessage("The avatar_url format is invalid"),
  body("birth_date")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Birth_date cannot be empty"),
];
import { body } from "express-validator";

//VALIDACIONES PARA ACTUALIZAR UN PERFIL
export const updateProfileValidations = [
  body("first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El nombre debe contener al menos 5 caracteres y un máximo de 50"
    )
    .matches(/^[A-Za-z]+$/)
    .withMessage("El nombre debe contener solamente letras, no números o signos"),
  body("lastname")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El apellido nombre no puede estar vacío")
    .isString()
    .withMessage("El aprllido debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El apellido debe contener al menos 5 caracteres y un máximo de 50"
    )
    .matches(/^[A-Za-z]+$/)
    .withMessage("El apellido debe contener solamente letras, no números o signos"),
  body("biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Biografía nombre no puede estar vacío")
    .isString()
    .withMessage("Biografía debe ser una cadena de caracteres")
    .isLength({ max: 500 })
    .withMessage("Biografía no puede exceder los 500 caracteres"),
  body("avatar_url")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El formato del avatar_url no puede estar vacío")
    .isURL()
    .withMessage("El formato del avatar_url es inválido"),
  body("birth_date")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La fecha de cumpleaños no puede estar vacío"),
];
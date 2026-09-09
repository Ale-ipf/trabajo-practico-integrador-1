import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";

//VALIDACIONES PARA CREAR UN USUARIO Y PERFIL
export const createUserValidations = [
  //VALIDACIONES PARA LOS CAMPOS DEL USUARIO
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacío")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de caracteres")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "El nombre de usuario debe contener al menos 3 caracteres y un maximo de 20"
    )
    .matches(/^[a-zA-Z0-9]/)
    .withMessage("El nombre de usuario debe ser alfanumérico")
    .custom(async (username, { req }) => {
      try {
        const usernameExisting = await User.findOne({
          where: { username: req.body.username },
        });

        if (usernameExisting) {
          return Promise.reject("Ese nombre de usuario ya existe, intenta con otro");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(
          "Error mientras se revisaba la viabilidad del nombre de usuario"
        );
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email no puede ser vacio")
    .isEmail()
    .withMessage("El formato del email no es válido")
    .custom(async (email, { req }) => {
      try {
        const emailExisting = await User.findOne({
          where: { email: req.body.email },
        });

        if (emailExisting) {
          return Promise.reject("Ese email ya existe, intenta con otro");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error mientras se revisaba la viabilidad del email");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña no puede estar vacío")
    .isString()
    .withMessage("La contraseña debe ser una cadena de caracteres")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
  body("role")
    .trim()
    .notEmpty()
    .withMessage("El rol no puede estar vacío")
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser o bien 'user' or 'admin'"),
  //VALIDACIONES PARA LOS CAMPOS DEL PERFIL
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El nombre must contain at least 5 characters and a maximum of 50"
    )
    .matches(/^[A-Za-z]+$/)
    .withMessage("El nombre must contain only letters, not numbers or signs"),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("El apellido no puede estar vacío")
    .isString()
    .withMessage("El apellido debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El apellido must contain at least 5 characters and a maximum of 50"
    )
    .matches(/^[A-Za-z]+$/)
    .withMessage("El apellido must contain only letters, not numbers or signs"),
  body("biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Biografía no puede estar vacío")
    .isString()
    .withMessage("Biografía debe ser una cadena de caracteres")
    .isLength({ max: 500 })
    .withMessage("Biografía cannot exceed 500 characters"),
  body("avatar_url")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The avatar_url no puede estar vacío")
    .isURL()
    .withMessage("El formato del avatar_url es inválido"),
  body("birth_date")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La fecha de cumpleaños no puede estar vacío"),
];

//VALIDACIONES PARA TRAER UN SOLO USUARIO
export const getUserValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un número mas grande que 0")
    .custom(async (id, { req }) => {
      try {
        const userExisting = await User.findOne({
          where: { id: req.params.id },
        });

        if (!userExisting) {
          return Promise.reject("No se encuentra usuario en la base de datos con ese id");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la existencia del usuario por id");
      }
    }),
];

//VALIDACIONES PARA ACTUALIZAR UN USUARIO
export const updateUerValidations = [
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacío")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de caracteres")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "El nombre de usuario must contain at least 3 characters and a maximun of 20"
    )
    .matches(/^[a-zA-Z0-9]/)
    .withMessage("El nombre de usuario debe ser alfanumérico")
    .custom(async (username, { req }) => {
      try {
        const usernameExisting = await User.findOne({
          where: { username: req.body.username },
        });

        if (usernameExisting) {
          return Promise.reject("El nombre de usuario ya existe, intenta con otro");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(
          "Error mientras se revisaba la viabilidad del nombre de usuario");
      }
    }),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email no puede estar vacío")
    .isEmail()
    .withMessage("El formato del email no es válido")
    .custom(async (email, { req }) => {
      try {
        const emailExisting = await User.findOne({
          where: { email: req.body.email },
        });

        if (emailExisting) {
          return Promise.reject("Ese email ya existe, intenta con otro");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error mientras se revisaba la viabilidad del email");
      }
    }),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La contraseña no puede estar vacío")
    .isString()
    .withMessage("La contraseña debe ser una cadena de caracteres")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
  body("role")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El rol no puede estar vacío")
    .isIn(["user", "admin"])
    .withMessage("EL Rol debe ser o bien 'user' or 'admin'"),
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id debe ser un número mas grande que 0")
    .custom(async (id, { req }) => {
      try {
        const userExisting = await User.findOne({
          where: { id: req.params.id },
        });

        if (!userExisting) {
          return Promise.reject("No se encuenta usuario en la base de datos con ese id");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la existencia del usuario por id");
      }
    }),
];

export const deleteUserValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id debe ser un número mas grande que 0")
    .custom(async (id, { req }) => {
      try {
        const userExisting = await User.findOne({
          where: { id: req.params.id },
        });

        if (!userExisting) {
          return Promise.reject("No se encuentra usuario en la base de datos con ese id");
        }
      } catch (error) {
        console.error(error);
        return Promise.reject("Error revisando la existencia del usuario por id");
      }
    }),
];
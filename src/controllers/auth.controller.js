import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";
import { generateToken } from "../helpers/jwt.helpers.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";


//FUNCION PARA REGISTRAR UN USUARIO
export const register = async (req, res) => {
  //TOMO TODOS LOS DATOS NECESARIOS REGISTRAR UN USUARIO (DEL USUARIO COMO DEL PERFIL)
  try {
    const { username, email, password, role, first_name, 
      lastname, biography, avatar_url, birth_date } = req.body;

    //HASHEO LA CONTRASEÑA
    const hashedPassword = await hashPassword(password);

    //CREO UN USUARIO
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });

    //AUTOMATICAMENTE CREO UN PERFIL
    await Profile.create({
      first_name, lastname, biography, avatar_url, birth_date,
      user_id: user.id, //LE ASIGNO EL ID DEL USUARIO QUE SE CREÓ MÁS ARRIBA
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del interior",
    });
  }
};

//FUNCION PARA LOGEAR UN USUARIO
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //PARA LOGEAR, BUSCO UN USUARIO EXISTENTE QUE TENGA LOS DATOS ENVIADOS
    const user = await User.findOne({
      where: {
        username: username,
      },
      include: {
        model: Profile,
        attributes: ["first_name", "lastname"],
        as: "profile",
      },
    });

    //SI NO EXISTE, ARROJO UN ERROR
    if (!user) {
      return res.status(404).json({ message: "Credenciales incorrectas"});
    }

    //COMPARO LA CONTRASEÑA CON LA CONTRASEÑA HASHEADA
    const validPassword = await comparePassword(password, user.password)

    //SI LA CONTRASEÑA NO ES LA MISMA, TIRO UN ERROR
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas'})
    }

    //CREO UN TOKEN
    const token = await generateToken(user);

    //ENVÍO EL JWT COMO COOKIE
    res.cookie("token", token, {
      httpOnly: true, // No accesible desde JavaScript
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    //MENSAJE DE QUE EL USUARIO SE LOGEÓ CORRECTAMENTE
    return res.status(200).json({
      message: "Logged correctly",
    });
  } catch (err) {
    console.log("Server error while Loging", err);
    return res.status(500).json({
      message: "Server error while Loging",
    });
  }
};

export const logout = async (req, res) => {
  try {
    //PARA DESLOGEAR UN USUARIO, BORRO SU COOKIE DEL NAVEGADOR
    res.clearCookie("token");
    return res.status(200).json({
      message: "You logged out correctly, good bye",
    });
  } catch (err) {
    console.error("Server error while logging out", err);
    return res.status(500).json({
      message: "Server error while logging out",
    });
  }
};
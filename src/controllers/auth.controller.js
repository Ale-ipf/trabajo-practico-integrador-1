import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";
import { generateToken } from "../helpers/jwt.helpers.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";

const getAuthCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const sameSite = process.env.COOKIE_SAME_SITE || (isProduction ? "none" : "lax");

  return {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true" || isProduction || sameSite === "none",
    sameSite,
    path: "/",
  };
};

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
      first_name,
      last_name: lastname,
      biography,
      avatar_url,
      birth_date,
      user_id: user.id, //LE ASIGNO EL ID DEL USUARIO QUE SE CREÓ MÁS ARRIBA
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
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
        attributes: ["first_name", "last_name"],
        as: "profile",
      },
    });

    //SI NO EXISTE, ARROJO UN ERROR
    if (!user) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    //COMPARO LA CONTRASEÑA CON LA CONTRASEÑA HASHEADA
    const validPassword = await comparePassword(password, user.password)

    //SI LA CONTRASEÑA NO ES LA MISMA, TIRO UN ERROR
    if (!validPassword) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    //CREO UN TOKEN
    const token = await generateToken(user);

    //ENVÍO EL JWT COMO COOKIE
    res.cookie("token", token, {
      ...getAuthCookieOptions(),
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    //MENSAJE DE QUE EL USUARIO SE LOGEÓ CORRECTAMENTE
    return res.status(200).json({
      message: "Inicio de sesión correcto",
    });
  } catch (err) {
    console.error("Error al iniciar sesión", err);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const logout = async (req, res) => {
  try {
    //PARA DESLOGEAR UN USUARIO, BORRO SU COOKIE DEL NAVEGADOR
    res.clearCookie("token", getAuthCookieOptions());
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
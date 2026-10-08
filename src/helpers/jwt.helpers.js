import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("La variable de entorno JWT_SECRET no está configurada");
  }

  return secret;
};

export const assertJwtSecretConfigured = () => {
  getJwtSecret();
};

//FUNCIÓN PARA GENERAR UN TOKEN
export const generateToken = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role
    },
    getJwtSecret(),
    {
      expiresIn: "1h",
    }
  );

  return token;
};

//FUNCION PARA VERIFICAR UN TOKEN
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, getJwtSecret());

    return decoded;
  } catch (error) {
    throw new Error("Error verifying the token", error);
  }
};
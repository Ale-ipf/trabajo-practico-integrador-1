import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//FUNCIÓN PARA GENERAR UN TOKEN
export const generateToken = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

//FUNCION PARA VERIFICAR UN TOKEN
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (error) {
    throw new Error("Error verifying the token", error);
  }
};
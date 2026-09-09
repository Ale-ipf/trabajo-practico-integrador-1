import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
//RUTAS
import authRouter from "./src/routes/auth.routes.js";
import articleRouter from "./src/routes/article.routes.js";
import userRouter from "./src/routes/user.routes.js";
import articleTagsRouter from "./src/routes/article_tag.routes.js";
import tagRouter from "./src/routes/tag.routes.js";

import { startDB } from "./src/config/database.js";
startDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());

app.use("/", authRouter, userRouter, articleRouter, articleTagsRouter, tagRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
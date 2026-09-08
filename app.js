import express from "express";
import { userRouter } from "./src/routes/user.routes.js";
import { Sequelize } from "sequelize";
import { startDB } from "./src/config/database.js";

const app = express();
const PORT = 3000;

app.use(express.json());

//RUTAS
app.use("/api", userRouter);

//Servidor
app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("integrador_tlp_db","root", "", {
    host: "localhost",
    dialect: "mysql",
});

export const startDB = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("La conexión a la db está lista");
};
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("integrador_tlp_db","root", "", {
    host: "localhost",
    dialect: "mysql",
});

export const startDB = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync({force: true});
        console.log("La conexión a la db está lista");
        
    } catch (error) {
        console.log("No se pudo conectar a la bd", error);
    }
};
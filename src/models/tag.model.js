import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Article } from "./article.model.js";

export const Tag = sequelize.define(
    "Tag",
    {
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        }
    }
);
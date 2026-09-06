import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Article_Tag = sequelize.define(
    "Article_Tag",
    {
        article_id: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        tag_id: {
            type: DataTypes.STRING()
        }
    }
);
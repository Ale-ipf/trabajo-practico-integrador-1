import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

export const Article = sequelize.define(
    "Article",
    {
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        excerpt: {
            type: DataTypes.STRING(500)
        },
        status: {
            type: DataTypes.ENUM("published","archived"),
            defaultValue: "published"
        }
    }
);

Article.belongsTo(User, { foreignKey: "user_id", as: "author" })
User.hasMany(Article, { foreignKey: "user_id", as:"articles" })
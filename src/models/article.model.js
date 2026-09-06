import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

export const Article = sequelize.define(
    "Article",
    {
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        content: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        excerpt: {
            type: DataTypes.STRING(255)
        },
        status: {
            type: DataTypes.ENUM("published","archived"),
            defaultValue: "published"

        },
        user_id: {
            type: DataTypes.ENUM(),
            allowNull: false,
            references: {
                model: "User",
                key: "id"
            }
        }
    }
);

Article.belongsTo(User, { foreignKey: "user_id", as: "author" })
User.hasMany(Article, { foreignKey: "user_id", as:"articles" })
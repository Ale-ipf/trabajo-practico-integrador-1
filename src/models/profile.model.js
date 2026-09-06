import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

export const Profile = sequelize.define(
    "Profile",
    {
        user_id: {
            type: DataTypes.STRING(),
            allowNull: false,
            unique: true,
            references: {
                model: "User",
                key: "id"
            }
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        biography: {
            type: DataTypes.TEXT,
        },
        avatar_url: {
            type: DataTypes.STRING(255)
        },
        birth_date: {
            type: DataTypes.DATEONLY()
        }
    }
);
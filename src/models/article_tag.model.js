import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Article } from "./article.model.js";
import { Tag } from "./tag.model.js";

export const Article_Tag = sequelize.define(
    "Article_Tag",
    {
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Article,
                key: "id"
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Tag,
                key: "id"
            }
        }
    }
);

Article.belongsToMany(Tag, {through: Article_Tag, foreignKey: "article_id", as: "tags"})
Tag.belongsToMany(Article, {through: Article_Tag, foreignKey: "tag_id", as: "articles"})
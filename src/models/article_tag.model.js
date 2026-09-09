import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Article } from "./article.model.js";
import { Tag } from "./tag.model.js";

export const ArticleTag = sequelize.define(
    "ArticleTag",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }
);

Article.belongsToMany(Tag, {through: ArticleTag, foreignKey: "article_id", as: "articles"})
Tag.belongsToMany(Article, {through: ArticleTag, foreignKey: "tag_id", as: "tags"})

ArticleTag.belongsTo(Article, {foreignKey: "article_id", onDelete: "CASCADE"})
ArticleTag.belongsTo(Tag, {foreignKey: "tag_id", onDelete: "CASCADE"})
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Article } from "./article.model.js";
import { Tag } from "./tag.model.js";

export const Article_Tag = sequelize.define(
    "ArticleTag",
    {
        id:{
            type: DataTypes.INTEGER
        }
    }
);

Article.belongsToMany(Tag, {through: Article_Tag, foreignKey: "article_id", as: "articles"})
Tag.belongsToMany(Article, {through: Article_Tag, foreignKey: "tag_id", as: "tags"})

ArticleTag.belongsTo(Article, {foreignKey: "article_id", onDelete: "CASCADE"})
ArticleTag.belongsTo(Tag, {foreignKey: "tag_id", onDelete: "CASCADE"})
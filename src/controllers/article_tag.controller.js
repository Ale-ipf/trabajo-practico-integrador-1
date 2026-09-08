import { matchedData } from "express-validator";
import { ArticleTag } from "../models/article_tag.model.js";

export const createArticleTag = async (req, res) => {
    try {
    const validatedData = matchedData(req);

    const articleTag = await ArticleTag.create(validatedData);

    return res.status(201).json({ message: "Tag de artículo creado correctamente",articleTag});
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor"});
    }
};

export const deleteArticleTag = async (req, res) => {
    try {
        await ArticleTag.destroy({ where: { id: req.params.articleTagId } });

        return res.status(200).json({
        message: "Tag de artículo eliminado"});
    } catch (error) {
        console.error(error);
        return Promise.reject("Error interno del servidor");
    }
};
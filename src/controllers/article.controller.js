import { Article } from "../models/article.model.js";
import { matchedData } from "express-validator";
import { User } from "../models/user.model.js";

//FUNCION PARA CREAR UN ARTÍCULO
export const createArticle = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const userLogged = req.userLogged;

        const article = await Article.create({
            title: validatedData.title,
            content: validatedData.content,
            excerpt: validatedData.excerpt,
            status: validatedData.status,
            user_id: userLogged.id,
    });

    return res.status(201).json({ message: "Articulo creado correctamente", article});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor"});
    }
};

//FUNCIÓN PARA LISTAR TODOS LOS ARTÍCULOS
export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            attributes: {
                exclude: ["content"],
            },
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "username"],
                },
            ],
        });

    if (articles.length === 0) {
        return res.status(404).json({
            message: "No se encuenta artículo en la base de datos",
        });
    }

    return res.status(200).json({
        message: "Artículo encontrado",
        articles});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: "Error interno del servidor",
        });
    }
};

//FUNCIÓN PARA LISTAR UN ARTÍCULO
export const getArticle = async (req, res) => {
    try {
        const article = await Article.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "username"],
                },
            ],
        });

    return res.status(200).json({ message: "Artículo encontrado",article});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor"});
    }
};

//FUNCIÓN PARA TRAER LOS ARTÍCULOS ASOCIADOS A UN USUARIO LOGEADO (AUTENTICADO)
export const getArticleUser = async (req, res) => {
    const userLogged = req.userLogged;
    try {
        const userArticles = await Article.findAll(
        { where: { user_id: userLogged.id } },
        {
            attributes: {
            exclude: ["content"],
            },
        include: {
            model: User,
            as: "author",
            attributes: {
                exclude: ["password"],
            },
        },
    }
);

    if (!userArticles) {
        return res.status(404).json({ message: "No hay artículo asociado a ese usuario"});
    }

    return res.status(200).json({ message: "Aticles founded",articles: article});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message:"Error interno del servidor"});
    }
};

//FUNCIÓN PARA TRAER UN ARTICULO ASOCIADO A UN USUARIO LOGEADO (AUTENTICADO) POR SU ID
export const getArticleUserById = async (req, res) => {
    const userLogged = req.userLogged;
    try {
        const article = await Article.findOne(
        {
            where: { user_id: userLogged.id },
        },
        {
        include: {
            model: User,
            as: "author",
            attributes: {
                exclude: ["password"],
            },
        },
    }
);

    if (!article) {
        return res.status(404).json({ message: "No se encuentra artículo en la base de datos con ese id"});
    }

    return res.status(200).json({
        message: "Artículo encontrado",article});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor"});
    }
};

//FUNCIÓN PARA ACTUALIZAR UN ARTÍCULO
export const updateArticle = async (req, res) => {
    try {
        const validatedData = matchedData(req, { locations: ["body"] });

    if (Object.keys(validatedData) == 0) {
        return res.status(400).json({ message: "No se envió nada para actualizar"});
    }

    await Article.update(
        {
            title: validatedData.title,
            content: validatedData.content,
            excerpt: validatedData.excerpt,
            status: validatedData.status,
            user_id: Article.user_id,
        },
        { where: { id: req.params.id } }
    );

    return res.status(200).json({ message: "Article updated"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while updating article"});
    }
};

//FUNCIÓN PARA ELIMINAR UN ARTÍCULO
export const deleteArticle = async (req, res) => {
    try {
        await Article.destroy({ where: { id: req.params.id } });

        return res.status(410).json({ message: "Artículo eliminado"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor"});
    }
};
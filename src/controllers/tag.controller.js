import { matchedData } from "express-validator";
import { Tag } from "../models/tag.model.js";


export const addTagToArticle = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const tag = await Tag.create(validatedData);
        return res.status(201).json({ message: "Se añadió tag", tag});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();

        if(tags.length === 0) {
            return res.status(404).json({
                message: "No se encuenta el tag en la base de datos"
            });
        }

        return res.status(200).json(tags);
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor"        
        });
    }
};

export const getTagById = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        return res.status(200).json(tag)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor"})
    }
};

export const updateTag = async (req, res) => {
    try {
        const validatedData = matchedData(req, {locations: ["body"]});

        if(Object.keys(validatedData) === 0){
            return res.status(400).json({ message: "No se envió nada para actualizar"});
        }

        await Tag.update(validatedData, {where: {id: req.params.id}});
        return res.status(200).json({message: "Tag actualizada"});
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor"})
    }
};

export const deleteTag = async (req, res) => {
    try {
        await Tag.destroy({where: { id: req.params.id}});
        return res.status(200).json({ message: "Tag eliminada"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor"});
    }
};
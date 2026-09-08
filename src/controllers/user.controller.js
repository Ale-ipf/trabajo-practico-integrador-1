import { matchedData } from "express-validator";
import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";
import { Article } from "../models/article.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll({
            attributes: {
                exclude: ["password"]
            },
            include: {
                model: Profiler,
                as: "profile"
            }
        });
        return res.status(200).json(user);

    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne(
            { where: { id: req.params.id}},
            { attributes: {
                exclude: ["password"],
                },
                include: [
                    {
                        model: Profile,
                        as: "profile"
                    },
                    {
                        model: Article,
                        as: "articles"
                    },
            ],
        }
    );

    return res.status(200).json(user);
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createUser = async (req, res) => {
    try{
        const validatedData = matchedData(req);
        const user = await User.create(validatedData);
        return res.status(201).json(user);
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor"});
    }
};

export const updateUser = async (req, res) => {
    try {
        const validatedData = matchedData(req, {locations: ["body"]});

        if(Object.keys(validatedData) == 0) {
            return res.status(400).json({ message: "No se envió nada para actualizar"});
        }

        await User.update(validatedData, 
            { where: { id: req.params.id},
        });

        return res.status(200).json({ message: "Usuario actualizado"});
        } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id}});

        return res.status(200).json({ message: "Usuario eliminado correctamente"});
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};
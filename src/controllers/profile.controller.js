import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import { matchedData } from 'express-validator'

//TRAER UN PERFIL (USUARIO AUTENTICADO)
export const getProfile = async (req, res) => {
  const userLogged = req.userLogged;
  try {
    const profile = await Profile.findOne({ where: { user_id: userLogged.id } });

    if (!profile) {
      return res.status(401).json({
        message: 'You are no authorized'
      })
    }

    return res.status(200).json({
      profile
    })
  } catch (err) {
    console.error("Server error while getting profile", err);
    return res.status(500).json("Server error while getting profile");
  }
};

//ACTUALIZAR UN USUARIO
export const updateProfile = async (req, res) => {
  const userLogged = req.userLogged;
  try {
    const userAuth = await User.findOne({ where: { id: userLogged.id } });

    if (!userAuth) {
      return res.status(401).json({
        message: 'You are not authorized'
      })
    }

    const validatedData = matchedData(req, { location: ['body'] });

    if (Object.keys(validatedData) === 0) {
      return res.status(400).json({
        message: 'You did not send anything to update'
      })
    }

    await Profile.update(validatedData, { where: { user_id: userAuth.id } })

    return res.status(200).json({
      message: 'Profile updated'
    })
  } catch (err) {
    console.error("Server error while updating a profile", err);
    return res.status(500).json({
      message: "Server error while updating a profile",
    });
  }
};
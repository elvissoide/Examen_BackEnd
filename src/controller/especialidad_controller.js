import Especialidad from "../models/Especialidad.js";
import mongoose from "mongoose";

const listarEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.find({}, '-createdAt -updatedAt -__v');
        res.status(200).json(especialidades);
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error al listar las especialidades." });
    }
};




const registrarEspecialidad = async (req, res) => {
    try {
        if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
        const { nombre, descripcion } = req.body
        const nuevaEspecialidad = new Especialidad({ nombre, descripcion })
        await nuevaEspecialidad.save()
        res.status(200).json({ msg: "Registro exitoso de la especialidad" })
    }
    catch (error) {
        console.log(error)
    }
}

export {
    listarEspecialidades,
    registrarEspecialidad
}
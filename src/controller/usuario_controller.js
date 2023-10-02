import Usuario from "../models/Usuario.js";
import mongoose from "mongoose";

const registro = async (req, res) => {
    const { email, password } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    const verificarEmailBDD = await Usuario.findOne({ email })
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })
    const nuevoUsuario = new Usuario(req.body)
    await nuevoUsuario.save()
    res.status(200).json({ msg: "Exito. Cuenta registrada exitosamente." })
}

// nuevoUsuario.crearToken()

export {
    registro
}
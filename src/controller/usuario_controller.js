import Usuario from "../models/Usuario.js";

function crearToken () {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 20; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        token += caracteres.charAt(indiceAleatorio);
    }
    console.log(token);
    return token;
}

const login = async(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findOne({email}).select("-__v -token -updatedAt -createdAt")
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const verificarPassword = await usuarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    const token = crearToken();
    usuarioBDD.token = token;
    await usuarioBDD.save();
    const {nombre,apellido,_id} = usuarioBDD
    res.status(200).json({
        token,
        nombre,
        apellido,
        _id,
        email:usuarioBDD.email
    })
}

const registro = async (req, res) => {
    const { email, password } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    const verificarEmailBDD = await Usuario.findOne({ email })
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })
    const nuevoUsuario = new Usuario(req.body)
    await nuevoUsuario.save()
    res.status(200).json({ msg: "Exito. Cuenta registrada exitosamente." })
}

// 

export {
    login,
    registro
}
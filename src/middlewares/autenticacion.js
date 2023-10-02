import Usuario from '../models/Usuario.js'

const verificarAutenticacion = async (req, res, next) => {
    const tokenCliente = req.headers.authorization;
    if (!tokenCliente) {
        return res.status(404).json({ msg: "Lo sentimos, debes proporcionar un token" });
    }

    try {
        const tokenDividido = tokenCliente.split(" ");
        const tokenNuevo = tokenDividido[1];
        console.log("token1|"+tokenNuevo+"|")
        const usuario = await verificarToken(tokenNuevo);
        if (!usuario) {
            throw new Error("Token no válido o autenticación fallida");
        }

        req.usuarioBDD = usuario;
        next();
    } catch (error) {
        return res.status(404).json({ msg: error.message });
    }
};

async function verificarToken(tokenCliente) {
    try {
        console.log("token2|"+tokenCliente+"|")
        const usuario = await Usuario.findOne({ token: tokenCliente }).lean().select("-password");
        return usuario;
    } catch (error) {
        return null;
    }
}

export default verificarAutenticacion;

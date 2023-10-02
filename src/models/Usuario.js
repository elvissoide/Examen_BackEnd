import { Schema, model } from 'mongoose'

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

usuarioSchema.methods.matchPassword = function (password) {
    const passwordsMatch = this.password === password;
    return passwordsMatch;
};

// Método para crear un token 
// usuarioSchema.methods.crearToken = function () {
//     const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let token = '';
//     for (let i = 0; i < 10; i++) {
//         const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
//         token += caracteres.charAt(indiceAleatorio);
//     }
//     return token;
// }

export default model('Usuario', usuarioSchema)
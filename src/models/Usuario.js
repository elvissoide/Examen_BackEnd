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

export default model('Usuario', usuarioSchema)
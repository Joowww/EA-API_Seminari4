import mongoose, { Schema, model, Types, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUsuario extends Document {
    _id: Types.ObjectId;
    username: string;
    gmail: string;
    password: string;
    birthday: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const usuarioSchema = new Schema<IUsuario>({
    username: { type: String, required: true, unique: true },
    gmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
}, {
    timestamps: false,
    versionKey: false
});

/* Hashing password befor save */
usuarioSchema.pre<IUsuario>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt();    
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

/* Comparing passwords */ 
usuarioSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
export default Usuario;
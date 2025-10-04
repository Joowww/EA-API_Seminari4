import mongoose, { Types } from "mongoose";

const eventoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    schedule: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    /* Array of users in the event */ 
    usuariosApuntados: {  
      type: [Types.ObjectId], 
      ref: 'Usuario', 
      default: [] 
    }
  },
  { timestamps: false, versionKey: false }
);

export interface IEvento {
  _id: Types.ObjectId;
  name: string;
  schedule: string;
  address?: string;
  usuariosApuntados: Types.ObjectId[]; 
}

const Evento = mongoose.model('Evento', eventoSchema);
export default Evento;
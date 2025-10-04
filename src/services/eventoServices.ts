import Evento, { IEvento } from '../models/evento';
import { Types } from 'mongoose';

export const createEvento = async (data: IEvento) => {
  const ev = new Evento(data);
  return await ev.save();
};

export const getAllEventos = async () => {
  // Usando populate para obtener información de los usuarios
  return await Evento.find().populate('usuariosApuntados', 'username gmail');
};

export const getEventoById = async (id: string) => {
  return await Evento.findById(id).populate('usuariosApuntados', 'username gmail');
};

export const updateEvento = async (id: string, data: Partial<IEvento>) => {
  return await Evento.findByIdAndUpdate(id, data, { new: true }).populate('usuariosApuntados', 'username gmail');
}

export const deleteEvento = async (id: string) => {
  return await Evento.deleteOne({ _id: id });
};

/* New methods to handle  users sign up to an event */ 

/* Add user to an event */ 
export const addUsuarioToEvento = async (eventoId: string, usuarioId: string) => {
  return await Evento.findByIdAndUpdate(
    eventoId,
    { 
      $addToSet: { usuariosApuntados: new Types.ObjectId(usuarioId) } // $addToSet evita duplicados
    },
    { new: true }
  ).populate('usuariosApuntados', 'username gmail');
};

/* Delete user of an event */ 
export const removeUsuarioFromEvento = async (eventoId: string, usuarioId: string) => {
  return await Evento.findByIdAndUpdate(
    eventoId,
    { 
      $pull: { usuariosApuntados: new Types.ObjectId(usuarioId) } // $pull elimina el elemento del array
    },
    { new: true }
  ).populate('usuariosApuntados', 'username gmail');
};

/* Get events with complete user information (using aggregate for more control) */ 
export const getEventosWithUsuarios = async () => {
  return await Evento.aggregate([
    {
      $lookup: {
        from: 'usuarios', 
        localField: 'usuariosApuntados',
        foreignField: '_id',
        as: 'usuariosInfo'
      }
    },
    {
      $project: {
        name: 1,
        schedule: 1,
        address: 1,
        usuariosCount: { $size: '$usuariosApuntados' },
        usuariosInfo: {
          $map: {
            input: '$usuariosInfo',
            as: 'usuario',
            in: {
              username: '$$usuario.username',
              gmail: '$$usuario.gmail'
            }
          }
        }
      }
    }
  ]);
};
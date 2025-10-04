import { Request, Response } from 'express';
import {
  createEvento,
  getAllEventos,
  getEventoById,
  updateEvento,
  deleteEvento,
  addUsuarioToEvento,
  removeUsuarioFromEvento,
  getEventosWithUsuarios
} from '../services/eventoServices';

export const createEventoHandler = async (req: Request, res: Response) => {
  try {
    const data = await createEvento(req.body);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlleventoHandler = async (_req: Request, res: Response) => {
  try {
    const data = await getAllEventos();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventoByIdHandler = async (req: Request, res: Response) => {
  try {
    const data = await getEventoById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEventoHandler = async (req: Request, res: Response) => {
  try {
    const data = await updateEvento(req.params.id, req.body);
    if (!data) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEventoHandler = async (req: Request, res: Response) => {
  try {
    const data = await deleteEvento(req.params.id);
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json({ message: 'Evento eliminado correctamente', data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/* New handlers to manage the users in events */

export const addUsuarioToEventoHandler = async (req: Request, res: Response) => {
  try {
    const { eventoId, usuarioId } = req.params;
    const eventoActualizado = await addUsuarioToEvento(eventoId, usuarioId);
    
    if (!eventoActualizado) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    
    res.json({
      message: 'Usuario añadido al evento correctamente',
      evento: eventoActualizado
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removeUsuarioFromEventoHandler = async (req: Request, res: Response) => {
  try {
    const { eventoId, usuarioId } = req.params;
    const eventoActualizado = await removeUsuarioFromEvento(eventoId, usuarioId);
    
    if (!eventoActualizado) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    
    res.json({
      message: 'Usuario eliminado del evento correctamente',
      evento: eventoActualizado
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventosWithUsuariosHandler = async (_req: Request, res: Response) => {
  try {
    const data = await getEventosWithUsuarios();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

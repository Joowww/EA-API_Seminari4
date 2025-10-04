import { Router } from 'express';
import * as eventoController from '../controller/eventoController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       required:
 *         - name
 *         - schedule
 *       properties:
 *         id:
 *           type: string
 *           description: ID generado por MongoDB
 *         name:
 *           type: string
 *         schedule:
 *           type: string
 *         address:
 *           type: string
 *         usuariosApuntados:
 *           type: array
 *           items:
 *             type: string
 *           description: Array de IDs de usuarios apuntados al evento
 *       example:
 *         name: "Seminario Node"
 *         schedule: "16:30 - 17:30"
 *         address: "Aula 3, Edificio A"
 *         usuariosApuntados: []
 */

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Crea un nuevo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 */
router.post('/', eventoController.createEventoHandler);

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Lista todos los eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', eventoController.getAlleventoHandler);

/**
 * @swagger
 * /event/with-users:
 *   get:
 *     summary: Obtiene todos los eventos con información completa de usuarios
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos con información de usuarios
 */
router.get('/with-users', eventoController.getEventosWithUsuariosHandler);

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Obtiene un evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', eventoController.getEventoByIdHandler);

/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Actualiza un evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', eventoController.updateEventoHandler);

/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Elimina un evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', eventoController.deleteEventoHandler);

/**
 * @swagger
 * /event/{eventoId}/add-user/{usuarioId}:
 *   post:
 *     summary: Añade un usuario a un evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario añadido al evento correctamente
 *       404:
 *         description: Evento no encontrado
 */
router.post('/:eventoId/add-user/:usuarioId', eventoController.addUsuarioToEventoHandler);

/**
 * @swagger
 * /event/{eventoId}/remove-user/{usuarioId}:
 *   delete:
 *     summary: Elimina un usuario de un evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado del evento correctamente
 *       404:
 *         description: Evento no encontrado
 */
router.delete('/:eventoId/remove-user/:usuarioId', eventoController.removeUsuarioFromEventoHandler);

export default router;
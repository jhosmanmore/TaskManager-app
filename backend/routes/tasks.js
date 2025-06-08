const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authenticateToken } = require('../middleware/auth');

// obtener tareas solo del usuario autenticado
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});

// Crear tarea asignada al usuario
router.post('/', authenticateToken, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: false,
      user: req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error al crear tarea:', err);
    res.status(400).json({ message: 'Error al crear tarea' });
  }
});

// se actualiza tarea si pertenece al usuario
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Tarea no encontrada o sin permisos' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar tarea' });
  }
});

// eliminar tarea si pertenece al usuario
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) return res.status(404).json({ message: 'Tarea no encontrada o sin permisos' });
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar tarea' });
  }
});

module.exports = router;

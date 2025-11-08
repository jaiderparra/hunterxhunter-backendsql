// controllers/personajes.controller.js
const { supabase } = require('../db.js');

// ✅ Obtener todos
const getPersonajes = async (req, res) => {
  const { data, error } = await supabase.from('personajes').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// 🔍 Buscar por nombre
const getPersonajeByNombre = async (req, res) => {
  const { nombre } = req.params;
  const { data, error } = await supabase
    .from('personajes')
    .select('*')
    .ilike('nombre', `%${nombre}%`);
  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ mensaje: 'Personaje no encontrado' });
  res.json(data);
};

// ➕ Crear
const createPersonaje = async (req, res) => {
  const { nombre, edad, altura, peso, imagen } = req.body;
  const { error } = await supabase.from('personajes').insert([{ nombre, edad, altura, peso, imagen }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: '✅ Personaje agregado correctamente' });
};

// ✏️ Actualizar
const updatePersonaje = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, altura, peso, imagen } = req.body;
  const { error } = await supabase
    .from('personajes')
    .update({ nombre, edad, altura, peso, imagen })
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: '✅ Personaje actualizado correctamente' });
};

// ❌ Eliminar
const deletePersonaje = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('personajes').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: '✅ Personaje eliminado correctamente' });
};

// 📦 Exportar todo
module.exports = {
  getPersonajes,
  getPersonajeByNombre,
  createPersonaje,
  updatePersonaje,
  deletePersonaje,
};

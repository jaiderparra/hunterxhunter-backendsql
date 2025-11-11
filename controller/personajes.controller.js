// controller/personajes.controller.js
const { supabase } = require('../db.js');

// ✅ Obtener todos los personajes
const getPersonajes = async (req, res) => {
  const { data, error } = await supabase.from('personajes').select('*');

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// ✅ Obtener personaje por ID (para editar)
// (Frontend lo necesita para precargar datos en update)
const getPersonajeById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('personajes')
    .select('*')
    .eq('id', id)
    .single(); // devuelve un solo registro

  if (error || !data)
    return res.status(404).json({ mensaje: 'Personaje no encontrado' });

  res.json(data);
};

// 🔍 Buscar por nombre (búsqueda individual opcional)
const getPersonajeByNombre = async (req, res) => {
  const { nombre } = req.params;

  const { data, error } = await supabase
    .from('personajes')
    .select('*')
    .ilike('nombre', `%${nombre}%`); // búsqueda de coincidencia parcial

  if (error) return res.status(500).json({ error: error.message });

  if (!data.length)
    return res.status(404).json({ mensaje: 'Personaje no encontrado' });

  res.json(data);
};

// ➕ Crear personaje
const createPersonaje = async (req, res) => {
  const { nombre, edad, altura, peso, imagen } = req.body;

  const { error } = await supabase
    .from('personajes')
    .insert([{ nombre, edad, altura, peso, imagen }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: '✅ Personaje agregado correctamente' });
};

// ✏️ Actualizar personaje
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

// ❌ Eliminar personaje
const deletePersonaje = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from('personajes').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: '✅ Personaje eliminado correctamente' });
};

// 📦 Exportar funciones
module.exports = {
  getPersonajes,
  getPersonajeById,
  getPersonajeByNombre,
  createPersonaje,
  updatePersonaje,
  deletePersonaje,
};

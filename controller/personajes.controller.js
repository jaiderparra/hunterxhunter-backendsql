import { supabase } from '../db.js';

export const getPersonajes = async (req, res) => {
  const { data, error } = await supabase.from('personajes').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const getPersonajeByNombre = async (req, res) => {
  const { nombre } = req.params;
  const { data, error } = await supabase
    .from('personajes')
    .select('*')
    .ilike('nombre', `%${nombre}%`);
  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ mensaje: 'Personaje no encontrado' });
  res.json(data);
};

export const createPersonaje = async (req, res) => {
  const { nombre, edad, altura, peso, imagen } = req.body;
  const { error } = await supabase.from('personajes').insert([{ nombre, edad, altura, peso, imagen }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: '✅ Personaje agregado correctamente' });
};

export const updatePersonaje = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, altura, peso, imagen } = req.body;
  const { error } = await supabase
    .from('personajes')
    .update({ nombre, edad, altura, peso, imagen })
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: '✅ Personaje actualizado correctamente' });
};

export const deletePersonaje = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('personajes').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: '✅ Personaje eliminado correctamente' });
};

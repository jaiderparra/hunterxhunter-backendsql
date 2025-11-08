// __test__/personajes.sql.test.js
const {
  getPersonajes,
  getPersonajeByNombre,
  createPersonaje,
} = require('../controller/personajes.controller.js');

// Mock del cliente Supabase
jest.mock('../db.js', () => {
  const mockFrom = jest.fn(() => mockFrom);
  mockFrom.select = jest.fn(() => mockFrom);
  mockFrom.ilike = jest.fn(() => mockFrom);
  mockFrom.insert = jest.fn(() => mockFrom);
  mockFrom.update = jest.fn(() => mockFrom);
  mockFrom.delete = jest.fn(() => mockFrom);
  mockFrom.eq = jest.fn(() => mockFrom);
  mockFrom.mockResolvedValue = jest.fn();

  return {
    supabase: {
      from: jest.fn(() => mockFrom),
    },
    __mockFrom: mockFrom, // referencia útil
  };
});

const { supabase, __mockFrom } = require('../db.js');

describe('🧪 Tests Personajes (SQL con Supabase)', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  test('getPersonajes retorna todos los personajes', async () => {
    __mockFrom.select.mockResolvedValueOnce({
      data: [{ id: 1, nombre: 'Gon' }],
      error: null,
    });

    await getPersonajes(req, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nombre: 'Gon' }]);
  });

  test('getPersonajeByNombre retorna personaje por nombre', async () => {
    req.params = { nombre: 'Killua' };

    __mockFrom.ilike.mockResolvedValueOnce({
      data: [{ id: 2, nombre: 'Killua' }],
      error: null,
    });

    await getPersonajeByNombre(req, res);
    expect(res.json).toHaveBeenCalledWith([{ id: 2, nombre: 'Killua' }]);
  });

  test('createPersonaje crea un personaje correctamente', async () => {
    req.body = {
      nombre: 'Leorio',
      edad: 19,
      altura: 180,
      peso: 75,
      imagen: 'https://example.com/leorio.jpg',
    };

    __mockFrom.insert.mockResolvedValueOnce({ error: null });

    await createPersonaje(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: '✅ Personaje agregado correctamente' });
  });
});

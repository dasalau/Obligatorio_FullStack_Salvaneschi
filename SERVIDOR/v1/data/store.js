import bcrypt from "bcryptjs";

export const store = {
  users: [],
  pacientes: [],
  especialidades: [],
  turnos: [],
};

const seedPassword = bcrypt.hashSync("admin123", 10);
const seedPasswordUser = bcrypt.hashSync("usuario123", 10);

store.users = [
  {
    id: "u-admin",
    username: "admin",
    password: seedPassword,
    plan: "premium",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u-usuario",
    username: "usuario1",
    password: seedPasswordUser,
    plan: "plus",
    role: "user",
    createdAt: new Date().toISOString(),
  },
];

store.pacientes = [
  {
    id: "p-1",
    nombre: "Ana",
    apellido: "Pérez",
    dni: "12345678",
    telefono: "099123456",
    email: "ana@ejemplo.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "p-2",
    nombre: "Luis",
    apellido: "García",
    dni: "87654321",
    telefono: "098765432",
    email: "luis@ejemplo.com",
    createdAt: new Date().toISOString(),
  },
];

store.especialidades = [
  {
    id: "e-1",
    nombre: "Rehabilitación",
    descripcion: "Sesiones de recuperación funcional y movilidad.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e-2",
    nombre: "Kinesiología",
    descripcion: "Terapia física aplicada a movimiento y dolor.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e-3",
    nombre: "Control postural",
    descripcion: "Evaluación y seguimiento postural.",
    createdAt: new Date().toISOString(),
  },
];

store.turnos = [
  {
    id: "t-1",
    pacienteId: "p-1",
    pacienteNombre: "Ana Pérez",
    fecha: "2026-09-10",
    hora: "09:00",
    motivo: "Dolor lumbar persistente",
    estado: "pendiente",
    especialidadId: "e-1",
    especialidadNombre: "Rehabilitación",
    imagen: "",
    createdBy: "u-usuario",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t-2",
    pacienteId: "p-2",
    pacienteNombre: "Luis García",
    fecha: "2026-09-10",
    hora: "11:00",
    motivo: "Rigidez de hombro",
    estado: "atendido",
    especialidadId: "e-2",
    especialidadNombre: "Kinesiología",
    imagen: "",
    createdBy: "u-usuario",
    createdAt: new Date().toISOString(),
  },
];

export const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  plan: user.plan,
  role: user.role,
  createdAt: user.createdAt,
});

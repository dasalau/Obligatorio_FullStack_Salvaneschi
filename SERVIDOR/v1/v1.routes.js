import express from "express";
import authRouter from "./routes/auth.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import pacientesRouter from "./routes/pacientes.routes.js";
import especialidadesRouter from "./routes/especialidades.routes.js";
import turnosRouter from "./routes/turnos.routes.js";
import iaRouter from "./routes/ia.routes.js";
import { authenticateMiddleware } from "./middlewares/authenticate.middleware.js";

const router = express.Router({ mergeParams: true });

//Rutas públicas Login y Registro
router.use("/auth", authRouter);

//middleware para verificacion de token
router.use(authenticateMiddleware);

//Rutas protegidas
router.use("/usuarios", usuariosRouter);
router.use("/pacientes", pacientesRouter);
router.use("/especialidades", especialidadesRouter);
router.use("/turnos", turnosRouter);
router.use("/ia", iaRouter);

export default router;

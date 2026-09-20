import express from 'express';
import authRouter from './routes/auth.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import pacientesRouter from './routes/pacientes.routes.js';
import especialidadesRouter from './routes/especialidades.routes.js';
import turnosRouter from './routes/turnos.routes.js';
import iaRouter from './routes/ia.routes.js';
import { authenticateMiddleware } from './middlewares/authenticate.middleware.js';
import dragonesRouter from './routes/dragones.routes.js';
import tesorosRouter from './routes/tesoros.routes.js';

import climaRouter from './routes/clima.routes.js';

const router = express.Router({ mergeParams: true });

//Rutas públicas Login y Registro
router.use('/auth', authRouter);

//middleware para verificacion de token
router.use(authenticateMiddleware);

//Rutas protegidas
router.use('/usuarios', usuariosRouter);
router.use('/pacientes', pacientesRouter);
router.use('/especialidades', especialidadesRouter);
router.use('/turnos', turnosRouter);
router.use('/ia', iaRouter);

router.use("/dragones", dragonesRouter);
router.use("/tesoros", tesorosRouter);

router.use("/clima", climaRouter);


export default router;
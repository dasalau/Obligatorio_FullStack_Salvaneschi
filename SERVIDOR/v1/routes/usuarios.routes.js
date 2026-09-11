import express from 'express';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';
import {
  getMiPerfil,
  cambiarPlan,
} from '../controllers/usuarios.controller.js';

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.get('/me', getMiPerfil);
router.patch('/change-plan', cambiarPlan);

export default router;

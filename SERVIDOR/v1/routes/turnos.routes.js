import express from 'express';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';
import {
  getTurnos,
  createTurno,
  getTurnoById,
  updateTurno,
  deleteTurno,
} from '../controllers/turnos.controller.js';

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.get('/', getTurnos);
router.post('/', createTurno);
router.get('/:id', getTurnoById);
router.put('/:id', updateTurno);
router.delete('/:id', deleteTurno);

export default router;

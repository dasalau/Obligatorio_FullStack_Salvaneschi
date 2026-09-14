import express from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateParamsMiddleware } from "../middlewares/validateParams.middleware.js";
import {
  getTurnos,
  createTurno,
  getTurnoById,
  updateTurno,
  deleteTurno,
} from "../controllers/turnos.controller.js";
import { turnoSchema, turnoIdSchema } from "../validators/turnos.validators.js";

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.get("/", getTurnos);
router.post("/", validateBodyMiddleware(turnoSchema), createTurno);
router.get("/:id", validateParamsMiddleware(turnoIdSchema), getTurnoById);
router.put(
  "/:id",
  validateParamsMiddleware(turnoIdSchema),
  validateBodyMiddleware(turnoSchema),
  updateTurno,
);
router.delete("/:id", validateParamsMiddleware(turnoIdSchema), deleteTurno);

export default router;

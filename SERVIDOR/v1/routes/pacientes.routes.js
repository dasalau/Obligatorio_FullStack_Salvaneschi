import express from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateParamsMiddleware } from "../middlewares/validateParams.middleware.js";
import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../controllers/pacientes.controller.js";
import {
  pacienteSchema,
  pacienteIdSchema,
} from "../validators/pacientes.validators.js";

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.get("/", getPacientes);
router.post("/", validateBodyMiddleware(pacienteSchema), createPaciente);
router.put(
  "/:id",
  validateParamsMiddleware(pacienteIdSchema),
  validateBodyMiddleware(pacienteSchema),
  updatePaciente,
);
router.delete(
  "/:id",
  validateParamsMiddleware(pacienteIdSchema),
  deletePaciente,
);

export default router;

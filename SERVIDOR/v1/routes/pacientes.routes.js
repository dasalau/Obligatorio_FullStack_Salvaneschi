import express from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateParamsMiddleware } from "../middlewares/validateParams.middleware.js";
import {
  getPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente,
  addPacienteImagen,
} from "../controllers/pacientes.controller.js";
import {
  pacienteSchema,
  pacienteIdSchema,
  pacienteImagenSchema,
} from "../validators/pacientes.validators.js";

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.get("/", getPacientes);
router.get("/:id", validateParamsMiddleware(pacienteIdSchema), getPacienteById);
router.post("/", validateBodyMiddleware(pacienteSchema), createPaciente);
router.put(
  "/:id",
  validateParamsMiddleware(pacienteIdSchema),
  validateBodyMiddleware(pacienteSchema),
  updatePaciente,
);
router.patch(
  "/:id/imagenes",
  validateParamsMiddleware(pacienteIdSchema),
  validateBodyMiddleware(pacienteImagenSchema),
  addPacienteImagen,
);
router.delete(
  "/:id",
  validateParamsMiddleware(pacienteIdSchema),
  deletePaciente,
);

export default router;

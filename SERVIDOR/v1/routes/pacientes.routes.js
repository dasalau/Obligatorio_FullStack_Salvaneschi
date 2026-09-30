import express from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
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
router.post(
  "/",
  upload.single("imagen"),
  validateBodyMiddleware(pacienteSchema),
  createPaciente,
);
router.put(
  "/:id",
  validateParamsMiddleware(pacienteIdSchema),
  validateBodyMiddleware(pacienteSchema),
  updatePaciente,
);
router.patch(
  "/:id/imagenes",
  validateParamsMiddleware(pacienteIdSchema),
  upload.single("imagen"),
  (req, res, next) => {
    if (req.file) return next();
    return validateBodyMiddleware(pacienteImagenSchema)(req, res, next);
  },
  addPacienteImagen,
);
router.delete(
  "/:id",
  validateParamsMiddleware(pacienteIdSchema),
  deletePaciente,
);

export default router;

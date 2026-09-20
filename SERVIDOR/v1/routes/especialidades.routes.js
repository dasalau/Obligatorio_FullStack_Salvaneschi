import express from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateParamsMiddleware } from "../middlewares/validateParams.middleware.js";
import {
  getEspecialidades,
  createEspecialidad,
  deleteEspecialidad,
  updateEspecialidad,
} from "../controllers/especialidades.controller.js";
import {
  especialidadSchema,
  especialidadIdSchema,
} from "../validators/especialidades.validators.js";

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.get("/", getEspecialidades);
router.post(
  "/",
  validateBodyMiddleware(especialidadSchema),
  createEspecialidad,
);
router.patch(
  "/:id",
  validateParamsMiddleware(especialidadIdSchema),
  validateBodyMiddleware(especialidadSchema),
  updateEspecialidad,
);
router.delete(
  "/:id",
  validateParamsMiddleware(especialidadIdSchema),
  deleteEspecialidad,
);

export default router;

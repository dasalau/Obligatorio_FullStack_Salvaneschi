import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateParamsMiddleware } from "../middlewares/validateParams.middleware.js";
import {
  obtenerCaracoles,
  crearCaracol,
  obtenerCaracolPorNombre,
} from "../controllers/snails.controller.js";
import {
  crearCaracolSchema,
  obtenerCaracolPorNombreSchema,
} from "../validators/snails.validators.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerCaracoles);
router.post("/", validateBodyMiddleware(crearCaracolSchema), crearCaracol);
router.get(
  "/:nombre",
  validateParamsMiddleware(obtenerCaracolPorNombreSchema),
  obtenerCaracolPorNombre,
);

export default router;

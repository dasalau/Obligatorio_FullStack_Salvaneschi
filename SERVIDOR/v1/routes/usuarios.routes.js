import express from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import {
  getMiPerfil,
  cambiarPlan,
} from "../controllers/usuarios.controller.js";
import { planSchema } from "../validators/usuarios.validators.js";

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.get("/me", getMiPerfil);
router.patch("/change-plan", validateBodyMiddleware(planSchema), cambiarPlan);

export default router;

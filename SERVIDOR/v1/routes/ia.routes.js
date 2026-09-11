import express from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { sugerirEspecialidad } from "../controllers/ia.controller.js";

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.post("/sugerir-especialidad", sugerirEspecialidad);

export default router;

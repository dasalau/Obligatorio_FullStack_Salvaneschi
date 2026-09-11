import express from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import {
  getEspecialidades,
  createEspecialidad,
  deleteEspecialidad,
} from "../controllers/especialidades.controller.js";

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.get("/", getEspecialidades);
router.post("/", createEspecialidad);
router.delete("/:id", deleteEspecialidad);

export default router;

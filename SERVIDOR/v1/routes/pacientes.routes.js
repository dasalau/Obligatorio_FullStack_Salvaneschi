import express from "express";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../controllers/pacientes.controller.js";

const router = express.Router({ mergeParams: true });

router.use(authenticateMiddleware);
router.get("/", getPacientes);
router.post("/", createPaciente);
router.put("/:id", updatePaciente);
router.delete("/:id", deletePaciente);

export default router;

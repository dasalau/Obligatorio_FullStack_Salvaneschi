import express from "express";
import { obtenerConsultaGroq } from "../controllers/groq.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", obtenerConsultaGroq);

export default router;

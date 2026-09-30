import { obtenerConsultaGroqService } from "../services/groq.service.js";

export const obtenerConsultaGroq = async (req, res) => {
  const messages = req.body.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      message: "Se requiere un array messages con al menos un mensaje válido",
    });
  }

  const chatCompletion = await obtenerConsultaGroqService(messages);
  return res.json(chatCompletion);
};

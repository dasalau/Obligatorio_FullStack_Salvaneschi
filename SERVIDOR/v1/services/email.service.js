import { Resend } from "resend";

export const sendTurnoConfirmationEmail = async ({
  to,
  pacienteNombre,
  especialidadNombre,
  fecha,
  hora,
  motivo,
}) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY no configurada. Se omite el envío del email.");
    return null;
  }

  if (!to) {
    throw new Error("Falta el email del destinatario");
  }

  const resend = new Resend(apiKey);

  const subject = `Confirmación de turno - ${especialidadNombre || "Consulta"}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Confirmación de turno</h2>
      <p>Hola ${pacienteNombre || "Paciente"},</p>
      <p>Tu turno fue confirmado con éxito.</p>
      <ul>
        <li><strong>Especialidad:</strong> ${especialidadNombre || "Consulta"}</li>
        <li><strong>Fecha:</strong> ${fecha}</li>
        <li><strong>Hora:</strong> ${hora}</li>
        <li><strong>Motivo:</strong> ${motivo || "Consulta"}</li>
      </ul>
      <p>Gracias por elegir nuestro consultorio.</p>
    </div>
  `;

  const response = await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to,
    subject,
    html,
  });

  return response;
};

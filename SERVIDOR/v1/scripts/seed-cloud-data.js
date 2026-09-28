import "dotenv/config";
import mongoose from "mongoose";

const main = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;

  const planes = [
    { codigo: "plus", nombre: "Plan Plus", maxTurnosActivos: 4, activo: true },
    {
      codigo: "premium",
      nombre: "Plan Premium",
      maxTurnosActivos: 999999,
      activo: true,
    },
  ];

  const roles = [
    { codigo: "user", nombre: "Usuario", activo: true },
    { codigo: "admin", nombre: "Administrador", activo: true },
  ];

  const especialidades = [
    {
      nombre: "Fisioterapia Deportiva",
      descripcion: "Tratamiento y prevencion de lesiones deportivas",
    },
    {
      nombre: "Fisioterapia Neurologica",
      descripcion: "Rehabilitacion para alteraciones neurologicas",
    },
    {
      nombre: "Fisioterapia Traumatologica",
      descripcion: "Recuperacion post traumatismos y cirugias",
    },
    {
      nombre: "Fisioterapia Respiratoria",
      descripcion: "Mejora de la funcion respiratoria y capacidad pulmonar",
    },
    {
      nombre: "Rehabilitacion Postural",
      descripcion: "Correccion postural y alivio del dolor musculoesqueletico",
    },
  ];

  for (const plan of planes) {
    await db
      .collection("planes")
      .updateOne({ codigo: plan.codigo }, { $set: plan }, { upsert: true });
  }

  for (const rol of roles) {
    await db
      .collection("roles")
      .updateOne({ codigo: rol.codigo }, { $set: rol }, { upsert: true });
  }

  for (const esp of especialidades) {
    await db
      .collection("especialidades")
      .updateOne({ nombre: esp.nombre }, { $set: esp }, { upsert: true });
  }

  const summary = {
    db: db.databaseName,
    planes: await db.collection("planes").countDocuments({}),
    roles: await db.collection("roles").countDocuments({}),
    especialidades: await db.collection("especialidades").countDocuments({}),
  };

  console.log("SEED_OK=" + JSON.stringify(summary));
  await mongoose.connection.close();
};

main().catch(async (error) => {
  console.error("SEED_ERROR=" + error.message);
  try {
    await mongoose.connection.close();
  } catch {}
  process.exit(1);
});

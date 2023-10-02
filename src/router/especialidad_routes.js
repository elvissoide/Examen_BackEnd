import { Router } from "express";
import { listarEspecialidades, registrarEspecialidad } from "../controller/especialidad_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router();

router.get("/especialidades",verificarAutenticacion,listarEspecialidades);
router.post("/especialidades/registro", verificarAutenticacion,registrarEspecialidad);

export default router;
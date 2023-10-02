import { Router } from "express";
import {
    registro
} from "../controller/usuario_controller.js";

const router = Router();

router.post('/registro',registro)

export default router;
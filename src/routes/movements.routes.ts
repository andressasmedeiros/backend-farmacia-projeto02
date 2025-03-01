import { Router } from "express";
import MovementsController from "../controllers/MovementsController";
import authenticate from "../middlewares/authenticate";
import { Permissions } from "../entities/Permission";

const movementsRouter = Router();

const movementsController = new MovementsController();
movementsRouter.post("/", authenticate([Permissions.PERMISSAO_FILIAL]), movementsController.create );

export default movementsRouter;

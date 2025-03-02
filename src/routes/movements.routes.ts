import { Router } from "express";
import MovementsController from "../controllers/MovementsController";
import authenticate from "../middlewares/authenticate";
import { Permissions } from "../entities/Permission";

const movementsRouter = Router();

const movementsController = new MovementsController();
movementsRouter.post("/", authenticate([Permissions.PERMISSAO_FILIAL]), movementsController.create );
movementsRouter.get("/", authenticate([Permissions.FILIAL_MOTORISTA]), movementsController.getAll );
movementsRouter.patch("/:id/start", authenticate([Permissions.MOTORISTA]), movementsController.startMovement );
movementsRouter.patch("/:id/end", authenticate([Permissions.MOTORISTA]), movementsController.endMovement  );

export default movementsRouter;

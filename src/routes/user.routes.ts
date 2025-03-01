import { Router } from "express";
import UserController from "../controllers/UserController";
import authenticate from "../middlewares/authenticate";
import { Permissions } from "../entities/Permission";
import authenticateById from "../middlewares/authenticateById";

const userRouter = Router();

const userController = new UserController();
userRouter.post("/", authenticate([Permissions.CRIAR_USUARIO]), userController.create)
userRouter.get("/", authenticate([Permissions.LISTAR_USUARIO]), userController.getAll)
userRouter.get("/:id", authenticateById(), userController.getById)
userRouter.put("/:id", authenticateById(), userController.putById)
userRouter.patch("/:id/status", authenticate([Permissions.ATUALIZAR_USUARIO]), userController.patchById)

export default userRouter;

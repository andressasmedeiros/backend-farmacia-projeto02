import { Router } from "express";
import UserController from "../controllers/UserController";
import authenticate from "../middlewares/authenticate";
import { Permissions } from "../entities/Permission";

const userRouter = Router();

const userController = new UserController();
userRouter.post("/", authenticate([Permissions.CRIAR_USUARIO]), userController.create )
userRouter.get("/", authenticate([Permissions.LISTAR_USUARIO]), userController.getAll )
userRouter.put("/:id", authenticate([Permissions.LISTAR_USUARIO_POR_ID]), userController.getById )

export default userRouter;

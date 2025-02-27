import { Router } from "express";
import UserController from "../controllers/UserController";
import authenticate from "../middlewares/authenticate";
import { Permissions } from "../entities/Permission";

const userRouter = Router();

const userController = new UserController();
userRouter.post("/", authenticate([Permissions.CRIAR_USUARIO]), userController.create )

export default userRouter;

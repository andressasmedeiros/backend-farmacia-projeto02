import { Router } from "express";
import LoginController from "../controllers/LoginController";

const loginRouter = Router();

const loginController = new LoginController();
loginRouter.post("/", loginController.create)

export default loginRouter;

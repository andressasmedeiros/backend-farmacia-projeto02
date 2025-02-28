import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import { Permissions } from "../entities/Permission";
import ProductsController from "../controllers/ProductsController";

const productsRouter = Router();

const productsController = new ProductsController();
productsRouter.post("/", authenticate([Permissions.CADASTRAR_PRODUTO]), productsController.create ),
productsRouter.get("/", authenticate([Permissions.CADASTRAR_PRODUTO]), productsController.getAll )

export default productsRouter;

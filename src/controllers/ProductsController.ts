import { Products } from "../entities/Products";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Branches } from "../entities/Branches";

class ProductsController {
    create = async (req: Request, res: Response) => {
        try {
            let { name, amount, description, url_cover } = req.body;

            const token = req.headers.authorization?.split(" ")[1] ?? ""
            if (!token) {
                res.status(401).json("Token inválido!")
                return;
            }
            const payload = jwt.verify(token, process.env.JWT_SECRET ?? "") as any
            const userId = payload.userId;
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId }, relations: ["branches"] });
            const branchRepository = AppDataSource.getRepository(Branches);
            const branch = await branchRepository.findOne({ where: { id: user?.branches.id } });
            if (!branch) {
                res.status(401).json("Usuário não possui filial cadastrada.")
                return;
            }
            const productsRepository = AppDataSource.getRepository(Products);
            const product = productsRepository.create({ name, amount, description, url_cover, branch });
            await productsRepository.save(product);

            res.status(201).json({ id: product.id, name, amount, description, url_cover,branch_id: branch.id });
            return;
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
}


export default ProductsController;
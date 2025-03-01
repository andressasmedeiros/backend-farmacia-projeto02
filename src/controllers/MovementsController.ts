import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { AppDataSource } from "../data-source";
import PayloadJwt from "../classes/PayloadJwt";
import { Movements } from "../entities/Movements";
import { Products } from "../entities/Products";
import { Branches } from "../entities/Branches";

class MovementsController {
    create = async (req: Request, res: Response) => {
        try {
            let { destination_branch_id, product_id, quantity } = req.body;

            const movementRepository = AppDataSource.getRepository(Movements);
            const productRepository = AppDataSource.getRepository(Products);
            const branchRepository = AppDataSource.getRepository(Branches);

            const branch = await branchRepository.findOne({ where: { id: destination_branch_id } });
            const product = await productRepository.findOne({ where: { id: product_id } });

            if (!quantity || quantity <= 0) {
                res.status(400).json({ message: "Quantidade inválida." });
                return;
            }

            if (!branch) {
                res.status(400).json({ message: "Filial de destino não encontrada." });
                return;
            }

            if (!product) {
                res.status(400).json({ message: "Produto não encontrado." });
                return;
            }

            if (quantity > product.amount) {
                res.status(400).json({ message: "Estoque insuficiente para essa movimentação." });
                return;
            }

            if (destination_branch_id === product.branch.id) {
                res.status(400).json({ message: "A filial de origem não pode ser a mesma que a filial de destino." });
                return;
            }

            product.amount -= quantity;
            await productRepository.save(product);

            const movement = movementRepository.create({ quantity, product, destinationBranches: branch });
            await movementRepository.save(movement);

        }
        catch (error) {
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
}


export default MovementsController;
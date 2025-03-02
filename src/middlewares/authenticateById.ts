import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../entities/Role";

const authenticateById = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1] ?? "";
            if (!token) {
                res.status(401).json({ message: "Token inválido!" });
                return;
            }

            const payload = jwt.verify(token, process.env.JWT_SECRET ?? "") as any;
            const roles = JSON.parse(payload.roles);
            const userIdFromToken = payload.userId;
            const userIdFromParams = +req.params.id;

            let hasPermission = false;

            roles.forEach((r: Role) => {
                if (r.description === "ADMIN") {
                    hasPermission = true;
                    return;
                }
            });

            if (!hasPermission && userIdFromToken !== userIdFromParams) {
                res.status(401).json({ message: "Usuário não possui autorização para acessar este recurso!" });
                return;
            }

            next();
        } catch (ex) {
            res.status(401).json({ message: "Token inválido!" });
            return;
        }
    };
};

export default authenticateById;

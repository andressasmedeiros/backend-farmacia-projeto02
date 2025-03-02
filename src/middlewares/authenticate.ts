import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Role } from "../entities/Role"
import { Permission } from "../entities/Permission"

const authenticate = (listaPermissoes: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1] ?? ""
            if (!token) {
                res.status(401).json("Token inválido!")
                return
            }

            const payload = jwt.verify(token, process.env.JWT_SECRET ?? "") as any

            const roles = JSON.parse(payload.roles)

            let hasPermission = false;

            roles.map((r: Role) => {

                if (r.description == "ADMIN") {
                    hasPermission = true;
                    return
                }

                r.permissions.map((p: Permission) => {
                    if (listaPermissoes.includes(p.description)) {
                        hasPermission = true;
                    }
                })
            })

            if (!hasPermission) {
                res.status(401).json({ message: "Usuário não possui autorização para acessar este recurso!" })
                return
            }

            next()
        } catch (ex) {
            res.status(401).json("Token inválido!")
        }
    }
}

export default authenticate
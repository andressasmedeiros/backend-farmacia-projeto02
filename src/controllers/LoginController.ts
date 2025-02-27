import { User } from "../entities/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { AppDataSource } from "../data-source";
import PayloadJwt from "../classes/PayloadJwt";

class LoginController {

    private userRepository = AppDataSource.getRepository(User);

    create = async (req: Request, res: Response) => {
        try {
            let { email, password } = req.body;

            const erros = []

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                erros.push("Email inválido.")
            }
            if (!password || password.length < 6 || password.length > 20) {
                erros.push("A senha não pode estar vazia e deve conter entre 6 e 20 caracteres.")
            }
            if (erros.length > 0) {
                res.status(400).json({ message: erros.join(" ") });
                return;
            }
            const user = await this.userRepository.findOne({
                where: {
                  email: email
                },
                relations: ["roles", "roles.permissions"],
                select: {
                  roles: {
                    id: true,
                    description: true,
                    permissions: {
                      id: true,
                      description: true
                    }
                  }
                }
              });
          
              if (!user) {
                res.status(401).json("Usuário e/ou senha incorreta..");
                return;
              }
          
              const valido = await bcrypt.compare(password, user.passwordHash);
              console.log(password, valido)
              if (valido) {
                const chaveSecretaJwt = process.env.JWT_SECRET ?? ""

                const payload = {
                  email: user.email,
                  userId: user.id,
                  roles: JSON.stringify(user.roles),
                } as PayloadJwt
          
                const token = await jwt.sign(payload, chaveSecretaJwt, { expiresIn: '1h' })
          
                res.status(200).json({ token, name: user.name, profile: user.profile })
              } else {
                res.status(401).json("Usuário e/ou senha incorreta.");
                return
              }
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ message: "Erro interno do servidor" });
            return;
        }
    }
}


export default LoginController;
import { Request, Response } from "express";
import { Profile, User } from "../entities/User";
import StringUtils from "../utils/StringUtils";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import { Drivers } from "../entities/Drivers";
import { Branches } from "../entities/Branches";

class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private driversRepository = AppDataSource.getRepository(Drivers);
  private branchesRepository = AppDataSource.getRepository(Branches);


  create = async (req: Request, res: Response) => {
    try {
      let { name, profile, email, password, document, full_address: fullAddress } = req.body;

      const erros = []
      if (!name) {
        erros.push("Nome inválido.")
      }
      if (!this.isValidProfile(profile)) {
        erros.push("Perfil inválido.")
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        erros.push("Email inválido.")
      }
      if (!password || password.length < 6 || password.length > 20) {
        erros.push("A senha não pode estar vazia e deve conter entre 6 e 20 caracteres.")
      }
      if (!document) {
        erros.push("Documento inválido.")
      } else if (Profile.DRIVER === profile) {
        if (!StringUtils.isValidCpf(document)) {
          erros.push("O documento deve ser um CPF válido.")
        }
      } else if (Profile.BRANCH === profile) {
        if (!StringUtils.isValidCnpj(document)) {
          erros.push("O documento deve ser um CNPJ válido.")
        }
      }
      if (erros.length > 0) {
        res.status(400).json({ message: erros.join(" ") });
        return;
      }

      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        res.status(409).json({ message: "Email já cadastrado." });
      }

      const salt = await bcrypt.genSalt(10);
      let senhaCriptografada = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({ name, email, passwordHash: password, profile });
      await this.userRepository.save(user);

      if (Profile.DRIVER === profile) {
        const driver = this.driversRepository.create({ document, fullAddress, user });
        await this.driversRepository.save(driver);
      }

      if (Profile.BRANCH === profile) {
        const branches = this.branchesRepository.create({ document, fullAddress, user });
        await this.branchesRepository.save(branches);
      }

      res.status(201).json({ name, profile })
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
      return;
    }
  };

  isValidProfile = (profile: string) => {
    return Object.values(Profile).includes(profile as Profile);
  }
}

export default UserController;

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
      let passwordHash = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({ name, email, passwordHash, profile });
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

  getAll = async (req: Request, res: Response) => {
    try {
      const { profile } = req.query;

      if (profile && !Object.values(Profile).includes(profile as Profile)) {
        res.status(400).json({ message: "Perfil inválido." });
        return;
      }

      const users = await this.userRepository.find({
        where: profile ? { profile: profile as Profile } : {},
        select: ["id", "name", "status", "profile"],
      });

      res.status(200).json(users);
      return;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
      return;
    }
  }

  getById = async (req: Request, res: Response) => {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!user) {
        res.status(204).json({});
        return;
      }
      let fullAddress = null;
      if (user.drivers) {
        fullAddress = user.drivers[0].fullAddress;
      } else if (user.branches) {
        fullAddress = user.branches.fullAddress;
      }
      res.status(200).json({
        id: user.id,
        name: user.name,
        status: user.status,
        full_address: fullAddress,
        profile: user.profile
      })
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
      return;
    }
  }

  putById = async (req: Request, res: Response) => {
    try {
      const { name, email, password, full_address, id, created_at, updated_at, status, profile } = req.body;

      if (id || created_at || updated_at || status || profile) {
        res.status(401).json({ message: "Não é permitido alterar id, created_at, updated_at, status, profile" });
        return;
      }

      const user = await this.userRepository.findOne({
        where: {
          id: Number(req.params.id),
        },
        relations: ["drivers", "branches"],
      });

      if (!user) {
        res.status(204).json({});
        return;
      }

      if (user.profile === Profile.ADMIN && full_address) {
        res.status(400).json({ message: "Administradores não possuem endereço." });
        return;
      }

      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(password, salt);
      }
      if (user.drivers.length > 0) {
        user.drivers[0].fullAddress = full_address || user.drivers[0].fullAddress;
      } else if (user.branches) {
        user.branches.fullAddress = full_address || user.branches.fullAddress;
      }

      await this.userRepository.save(user);
      let fullAddress = null;
      if (user.drivers.length > 0) {
        fullAddress = user.drivers[0].fullAddress;
      } else if (user.branches) {
        fullAddress = user.branches.fullAddress;
      }
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        full_address: fullAddress
      })
    }
    catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
      return;
    }
  }
}

export default UserController;

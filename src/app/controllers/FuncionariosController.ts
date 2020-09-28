import { request, response } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../../middleawares/ensureAuthenticated';
import usuariosRouter from '../../routes/usuarios.routes';
import Funcionarios from '../models/Funcionarios';
import FuncionariosAvatarControllers from './FuncionariosAvatarController';

interface Request {
  nome: string;
  email: string;
  avatar: string;
}

class FuncionariosControllers {
  public async store({ nome, email, avatar }: Request): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);

    const verificaFuncionarios = await funcionariosRepository.findOne({
      where: { email },
    });
    if (verificaFuncionarios) {
      throw new Error('Email ja cadastrado!');
    }

    const users = funcionariosRepository.create({
      nome,
      email,
      avatar,
    });

    await funcionariosRepository.save(users);

    return users;
  }
}

export default FuncionariosControllers;

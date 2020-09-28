import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import usuariosRouter from '../../routes/usuarios.routes';
import Usuarios from '../models/Usuarios';
import authConfig from '../../config/auth';

interface Request {
  matricula: string;
  password: string;
}
interface Response {
  user: Usuarios;
  token: string;
}

class SessionsUsersController {
  public async store({ matricula, password }: Request): Promise<Response> {
    const usuariosRepository = getRepository(Usuarios);
    const user = await usuariosRepository.findOne({ where: { matricula } });

    if (!user) {
      throw new Error('Combinação matricula/senha incorretos.');
    }

    const verificarSenha = await compare(password, user.password);

    if (!verificarSenha) {
      throw new Error('Combinação matricula/senha incorretos.');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default SessionsUsersController;

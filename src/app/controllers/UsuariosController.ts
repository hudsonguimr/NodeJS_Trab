import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Usuarios from '../models/Usuarios';

interface Request {
  matricula: string;
  password: string;
}

class UsuariosControllers {
  public async store({ matricula, password }: Request): Promise<Usuarios> {
    const usuarioRepository = getRepository(Usuarios);

    const verificaUsuario = await usuarioRepository.findOne({
      where: { matricula },
    });
    if (verificaUsuario) {
      throw new Error('Endereço de matricula ja cadastrado.');
    }

    const hashedpassword = await hash(password, 8);

    const users = usuarioRepository.create({
      matricula,
      password: hashedpassword,
    });

    await usuarioRepository.save(users);

    return users;
  }
}

export default UsuariosControllers;

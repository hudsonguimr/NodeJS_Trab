import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Funcionarios from '../models/Funcionarios';
import uploadConfig from '../../config/upload';

const Temporario = path.resolve(__dirname, '..', '..', '..', 'tmp');

interface Request {
  user_id: string;
  avatarFileName: string;
}

class FuncionariosAvatarController {
  public async update({
    user_id,
    avatarFileName,
  }: Request): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);
    const func = await funcionariosRepository.findOne(user_id);
    if (!func) {
      throw new Error('ID do usuário incorreto!');
    }
    if (func.avatar) {
      const funcAvatarFilePath = path.join(Temporario, func.avatar);
      const funcAvatarFileExists = await fs.promises.stat(funcAvatarFilePath);
      if (funcAvatarFileExists) {
        await fs.promises.unlink(funcAvatarFilePath);
      }
    }
    func.avatar = avatarFileName;
    await funcionariosRepository.save(func);
    return func;
  }
}

export default FuncionariosAvatarController;

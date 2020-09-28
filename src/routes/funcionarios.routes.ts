import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';
import FuncionariosController from '../app/controllers/FuncionariosController';
import Funcionarios from '../app/models/Funcionarios';
import FuncionariosAvatarController from '../app/controllers/FuncionariosAvatarController';

const funcionariosRouter = Router();
funcionariosRouter.use(ensureAuthenticated);
const upload = multer(uploadConfig);

funcionariosRouter.post('/', async (request, response) => {
  try {
    const { nome, email, avatar } = request.body;
    const funcionariosController = new FuncionariosController();

    const user = await funcionariosController.store({
      nome,
      email,
      avatar,
    });

    return response.json(user);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

funcionariosRouter.get('/', async (request, response) => {
  const funcionariosRepository = getRepository(Funcionarios);
  const user = await funcionariosRepository.find();

  return response.json(user);
});

funcionariosRouter.get('/:id', async (request, response) => {
  const funcionariosRepository = getRepository(Funcionarios);
  const { id } = request.params;
  const user = await funcionariosRepository.findOne(id);
  return response.json(user);
});

funcionariosRouter.delete('/:id', async (request, response) => {
  const treinamentosRepositorio = getRepository(Funcionarios);
  const { id } = request.params;
  await treinamentosRepositorio.delete(id);
  return response.send();
});

funcionariosRouter.patch(
  '/avatar/:id',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const funcionariosAvatarController = new FuncionariosAvatarController();
      const { id } = request.params;
      const func = await funcionariosAvatarController.update({
        user_id: id,
        avatarFileName: request.file.filename,
      });
      console.log(request.file);
      return response.json(func);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default funcionariosRouter;

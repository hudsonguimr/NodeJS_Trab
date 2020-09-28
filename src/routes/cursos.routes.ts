import { Router } from 'express';
import { getRepository } from 'typeorm';
import CursosController from '../app/controllers/CursosController';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';
import Cursos from '../app/models/Cursos';

const cursosRouter = Router();
cursosRouter.use(ensureAuthenticated);

cursosRouter.get('/', async (request, response) => {
  const usuariosRepositorio = getRepository(Cursos);
  const user = await usuariosRepositorio.find();

  return response.json(user);
});

cursosRouter.get('/:id', async (request, response) => {
  const usuariosRepositorio = getRepository(Cursos);
  const { id } = request.params;
  const user = await usuariosRepositorio.findOne(id);
  return response.json(user);
});

cursosRouter.delete('/:id', async (request, response) => {
  const usuariosRepositorio = getRepository(Cursos);
  const { id } = request.params;
  await usuariosRepositorio.delete(id);
  return response.send();
});
cursosRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { nomecurso, carga_horaria } = request.body;
    const cursosController = new CursosController();

    const curso = await cursosController.update({
      id_cursos: id,
      nomecurso,
      carga_horaria,
    });
    return response.json(curso);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});
cursosRouter.post('/', async (request, response) => {
  try {
    const { nomecurso, carga_horaria } = request.body;
    const cursosController = new CursosController();

    const user = await cursosController.store({
      nomecurso,
      carga_horaria,
    });

    return response.json(user);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});
export default cursosRouter;

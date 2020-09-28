import { Router } from 'express';
import { getRepository } from 'typeorm';
import TreinamentosController from '../app/controllers/TreinamentosController';
import Treinamentos from '../app/models/Treinamentos';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';
import Cursos from '../app/models/Cursos';
import Funcionarios from '../app/models/Funcionarios';

const treinamentosRouter = Router();
treinamentosRouter.use(ensureAuthenticated);
treinamentosRouter.get('/', async (request, response) => {
  const usuariosRepositorio = getRepository(Treinamentos);
  const user = await usuariosRepositorio.find();

  return response.json(user);
});

treinamentosRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { id_cursos, id_funcionarios, data_treinamento } = request.body;
    const treinamentosController = new TreinamentosController();
    const treinamentos = await treinamentosController.update({
      id,
      id_funcionarios,
      id_cursos,
      data_treinamento,
    });
    return response.json(treinamentos);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

treinamentosRouter.post('/', async (request, response) => {
  try {
    const { matricula, id_cursos, data_treinamento } = request.body;
    const treinamentosController = new TreinamentosController();

    const user = await treinamentosController.store({
      id_funcionarios: matricula,
      id_cursos,
      data_treinamento,
    });

    return response.json(user);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});
treinamentosRouter.delete('/:id', async (request, response) => {
  const treinamentosRepositorio = getRepository(Treinamentos);
  const { id } = request.params;
  await treinamentosRepositorio.delete(id);
  return response.send();
});

treinamentosRouter.get('/listar/:id', async (request, response) => {
  const cursosRepository = getRepository(Cursos);
  const funcionariosRepository = getRepository(Funcionarios);
  const treinamentosRepository = getRepository(Treinamentos);
  const { id } = request.params;
  const treinamentos = await treinamentosRepository.findOne(id);
  const cursos = await cursosRepository.findOne(treinamentos?.id_cursos);
  const funcionarios = await funcionariosRepository.findOne(
    treinamentos?.id_funcionarios,
  );
  const array = [treinamentos, cursos, funcionarios];

  return response.json(array);
});

export default treinamentosRouter;

/* (id do funcionário, nome do funcionário, id do curso, nome do curso, data do treinamento, vencimento do treinamento */

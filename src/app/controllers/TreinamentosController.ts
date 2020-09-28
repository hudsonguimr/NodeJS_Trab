import { getRepository } from 'typeorm';
import { startOfHour, parseISO, addHours } from 'date-fns';
import treinamentosRouter from '../../routes/treinamentos.routes';
import Cursos from '../models/Cursos';
import Treinamentos from '../models/Treinamentos';

interface Request {
  id_funcionarios: string;
  id_cursos: string;
  data_treinamento: string;
}
interface Request_update {
  id: string;
  id_funcionarios: string;
  id_cursos: string;
  data_treinamento: string;
}
class TreinamentosController {
  public async store({
    id_funcionarios,
    id_cursos,
    data_treinamento,
  }: Request): Promise<Treinamentos> {
    const datapassada = startOfHour(parseISO(data_treinamento));
    const treinamentosRepository = getRepository(Treinamentos);
    const cursosRepository = getRepository(Cursos);
    const encontrarCursoID = await cursosRepository.findOne({
      where: { id: id_cursos },
    });

    const encotrarAgendamentoMesmaData = await treinamentosRepository.findOne({
      where: { data_treinamento: datapassada },
    });

    if (encotrarAgendamentoMesmaData) {
      throw new Error(
        'Já existe um treinamento para esse funcionario com essa data e horário.',
      );
    }
    if (!encontrarCursoID) {
      throw new Error('Não encontrado ID do curso.');
    }
    const carga_horaria_number = +encontrarCursoID.carga_horaria;
    const treinamentos = treinamentosRepository.create({
      id_funcionarios,
      id_cursos,
      data_treinamento: datapassada,
      data_final: addHours(datapassada, carga_horaria_number),
    });
    await treinamentosRepository.save(treinamentos);
    return treinamentos;
  }

  public async update({
    id,
    id_funcionarios,
    id_cursos,
    data_treinamento,
  }: Request_update): Promise<Treinamentos> {
    const treinamentosRepository = getRepository(Treinamentos);

    const verificarTreinamento = await treinamentosRepository.findOne({
      where: { id },
    });
    if (!verificarTreinamento) {
      throw new Error('Treinamento não encontrado.');
    }
    verificarTreinamento.id_funcionarios = id_funcionarios;
    const datapassada = startOfHour(parseISO(data_treinamento));
    verificarTreinamento.id_cursos = id_cursos;
    verificarTreinamento.data_treinamento = datapassada;
    await treinamentosRepository.save(verificarTreinamento);
    return verificarTreinamento;
  }
}

export default TreinamentosController;

import { getRepository } from 'typeorm';
import Cursos from '../models/Cursos';

interface Request {
  nomecurso: string;
  carga_horaria: string;
}
interface Request_update {
  nomecurso: string;
  id_cursos: string;
  carga_horaria: string;
}

class CursosController {
  public async store({ nomecurso, carga_horaria }: Request): Promise<Cursos> {
    const cursosRepository = getRepository(Cursos);

    const verificaCurso = await cursosRepository.findOne({
      where: { nomecurso },
    });
    if (verificaCurso) {
      throw new Error('Curso ja cadastrada!');
    }

    const curso = cursosRepository.create({
      nomecurso,
      carga_horaria,
    });

    await cursosRepository.save(curso);

    return curso;
  }

  public async update({
    id_cursos,
    nomecurso,
    carga_horaria,
  }: Request_update): Promise<Cursos> {
    const cursosRepository = getRepository(Cursos);

    const verificarCurso = await cursosRepository.findOne({
      where: { id: id_cursos },
    });
    if (!verificarCurso) {
      throw new Error('Cursos não encontrado.');
    }
    verificarCurso.nomecurso = nomecurso;
    verificarCurso.carga_horaria = carga_horaria;
    await cursosRepository.save(verificarCurso);
    return verificarCurso;
  }
}

export default CursosController;

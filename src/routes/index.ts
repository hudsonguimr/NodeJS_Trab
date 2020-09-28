import { Router } from 'express';
import usuariosRouter from './usuarios.routes';
import sessionsRouter from './sessions.routes';
import cursosRouter from './cursos.routes';
import treinamentosRouter from './treinamentos.routes';
import funcionariosRouter from './funcionarios.routes';

const routes = Router();
routes.use('/Usuarios', usuariosRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/cursos', cursosRouter);
routes.use('/treinamentos', treinamentosRouter);
routes.use('/avatar', treinamentosRouter);
routes.use('/funcionarios', funcionariosRouter);

export default routes;

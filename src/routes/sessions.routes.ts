import { Router } from 'express';
import SessionsUsersController from '../app/controllers/SessionsUserController';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { matricula, password } = request.body;
  try {
    const sessionsUserController = new SessionsUsersController();
    const { user, token } = await sessionsUserController.store({
      matricula,
      password,
    });

    return response.json({ user, token });
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

export default sessionsRouter;

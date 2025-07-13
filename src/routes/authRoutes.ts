import { FastifyInstance } from 'fastify';
import { login, register, getMe } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

export default async function authRoutes(app: FastifyInstance) {
  app.post('/register', register);
  app.post('/login', login);
  app.get('/me', { preHandler: [authMiddleware] }, getMe);
}

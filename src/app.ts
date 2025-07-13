import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import dotenv from 'dotenv';
dotenv.config();

const app = fastify({ logger: true });

app.register(cors);
app.register(jwt, { secret: process.env.JWT_SECRET! });

app.addHook('onRequest', loggerMiddleware);

app.register(authRoutes, { prefix: '/auth' });

export default app;

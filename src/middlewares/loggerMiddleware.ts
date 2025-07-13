import { FastifyRequest, FastifyReply } from 'fastify';

export const loggerMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log(`[${req.method}] ${req.url}`);
};

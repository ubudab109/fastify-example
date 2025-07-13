import { FastifyRequest, FastifyReply } from 'fastify';

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
};

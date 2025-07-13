import { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, findUserByEmail } from '../repositories/userRepository';
import bcrypt from 'bcryptjs';

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as any;
  const existing = await findUserByEmail(email);
  if (existing) return reply.status(400).send({ message: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await registerUser(email, hashed);
  reply.send({ user: { id: user.id, email: user.email } });
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as any;
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }
  const token = (reply as any).jwtSign({ id: user.id });
  reply.send({ token });
};

export const getMe = async (req: any, reply: FastifyReply) => {
  reply.send({ user: req.user });
};

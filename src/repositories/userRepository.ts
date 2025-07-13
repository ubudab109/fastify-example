import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export const registerUser = (email: string, password: string): Promise<User> => {
  return prisma.user.create({ data: { email, password } });
};

export const findUserByEmail = (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

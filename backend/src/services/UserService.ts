import Crypt from '@utils/Crypt.js';
import type { UserCreatePayload } from '../@types/user.js';
import { prisma } from '../db/Prisma.js';
import type { User } from 'src/generated/prisma/client.js';

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
};

class UserService {
  async create(user: UserCreatePayload) {
    const { email, name, role, password } = user;
    const encryptedPassword = await Crypt.encrypt(password);

    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        role,
        password: encryptedPassword,
      },
      select: userSelect,
    });

    return createdUser;
  }

  async find(params: Partial<User>) {
    if (!params.id && !params.email) {
      throw new Error('At least one of id or email must be provided to find a user.');
    }
    const { password, ...searchParams } = params;
    const user = await prisma.user.findFirst({
      where: searchParams,
      select: { ...userSelect, password: !!password },
    });
    const { password: userPassword, ...userInfo } = user || {};

    if (user && password && userPassword) {
      const isValidPassword = await Crypt.isValid(password, userPassword);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }
    }
    return userInfo;
  }

  async list() {
    const users = await prisma.user.findMany({
      select: userSelect,
    });
    return users;
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: { id },
    });
  }

  async update(id: string, data: Partial<UserCreatePayload>) {
    const dataToUpdate: Partial<UserCreatePayload> = { ...data };

    if (data.password) {
      dataToUpdate.password = await Crypt.encrypt(data.password);
    }

    if (data.email) {
      delete dataToUpdate.email;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
      select: userSelect,
    });
    return updatedUser;
  }
}

export default new UserService();

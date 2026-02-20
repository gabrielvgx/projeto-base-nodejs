import Crypt from '@utils/Crypt.js';
import type { UserCreatePayload } from '../@types/user.js';
import { prisma } from '../db/Prisma.js';

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
    });

    return { id: createdUser.id };
  }

  async list() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    return users;
  }
}

export default new UserService();

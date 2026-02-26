import { Crypt, HttpCode } from '@utils';
import type { UserCreatePayload } from '@types';
import { prisma } from '@db';
import type { User } from '@prisma';
import { AppError } from '@error';

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
      throw new AppError(
        'At least one of id or email must be provided to find a user.',
        HttpCode.BAD_REQUEST,
      );
    }
    const { password, ...searchParams } = params;
    const user = await prisma.user.findFirst({
      where: searchParams,
      select: { ...userSelect, password: !!password },
    });
    const { password: userPassword, ...userInfo } = user || {};

    if (!user) {
      return null;
    }
    if (password && userPassword) {
      const isValidPassword = await Crypt.isValid(password, userPassword);
      if (!isValidPassword) {
        throw new AppError('Invalid credentials', HttpCode.UNAUTHORIZED);
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

const instance = new UserService();
export { instance as UserService };

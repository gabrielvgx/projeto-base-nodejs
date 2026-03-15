import ms from 'ms';
import { UserService } from '@services';
import type { UserCreatePayload } from '@types';
import type { User } from '../generated/prisma/client.js';
import { AppError } from '@error';
import { HttpCode, OTPUtil } from '@utils';

class UserController {
  async create(user: UserCreatePayload) {
    const result = await UserService.create(user);
    return result;
  }
  list() {
    return UserService.list();
  }
  async find(params: Partial<User>) {
    return UserService.find(params);
  }
  async update(id: string, data: Partial<UserCreatePayload>) {
    return UserService.update(id, data);
  }
  async delete(id: string) {
    return UserService.delete(id);
  }
  async forgotPassword(email: string) {
    await UserService.forgotPassword(email);
    return { message: 'recovery code sent by email' };
  }
  async validateOTP({ email, otp }: { email: string; otp: string }) {
    const user = await UserService.find({ email }, { otpSecret: true });
    if (!user) throw new AppError('User not found', HttpCode.NOT_FOUND);
    if (!user.otpSecret) return false;

    return OTPUtil.verify(otp, user.otpSecret, ms('5m'));
  }
  async resetPassword(email: string, newPassword: string) {
    await UserService.updatePassword(email, newPassword);
  }
}

const instance = new UserController();
export { instance as UserController };

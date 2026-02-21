import type { UserRole } from '@validations';

export type UserCreatePayload = {
  email: string;
  name: string;
  role: UserRole;
  password: string;
};

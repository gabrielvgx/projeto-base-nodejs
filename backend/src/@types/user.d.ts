export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserCreatePayload = {
  email: string;
  name: string;
  role: UserRole;
  password: string;
};

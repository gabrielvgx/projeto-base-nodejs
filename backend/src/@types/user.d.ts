export type UserCreatePayload = {
  email: string;
  name: string;
  role: 'admin' | 'user';
  password: string;
};

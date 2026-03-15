import type { Request as RequestServer } from 'express';
import type { UserTokenInfo } from './user.js';
export type { Application, Response, NextFunction } from 'express';

type Request = RequestServer & { user?: UserTokenInfo; operation?: 'RESET_PASSWORD' };
export { Request };

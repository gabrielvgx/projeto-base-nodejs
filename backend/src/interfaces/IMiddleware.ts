import type { Application } from "express";

export interface IMiddleware {
  register(app: Application): void;
}
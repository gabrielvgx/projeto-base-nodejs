import type { IMiddleware } from "src/interfaces/IMiddleware.js";
import type { Application } from "express";
import express from "express";

class AppMiddleware implements IMiddleware {
  register(app: Application) {
    app.use(express.json());
  }
}

export default new AppMiddleware();
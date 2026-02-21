import './utils/Env.js';
import express from 'express';
import { Router } from './Router.js';
import { MiddlewareManager } from '@middlewares';
const app = express();
const PORT = 3000;

MiddlewareManager.register(app);
Router.register(app);

app.get('/users', (_req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

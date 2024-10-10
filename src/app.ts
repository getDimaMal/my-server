import 'reflect-metadata';
import express, { Request, Response } from 'express';
import router from './router';

import { AppDataSource } from './utils/db';


const app = express();

AppDataSource
  .initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) => console.error('Error during Data Source initialization', err));

app.use(express.json());

app.use('/', router);

app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

export default app;
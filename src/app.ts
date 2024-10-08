import express, { Request, Response } from 'express';

import pool from './utils/db';
import redisClient from './utils/redis';


const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Server error');
  }
});

app.get('/cache', async (req: Request, res: Response) => {
  try {
    await redisClient.set('message', 'Hello from Redis!');
    const message = await redisClient.get('message');
    res.send(message);
  } catch (error) {
    console.error('Error with Redis', error);
    res.status(500).send('Server error');
  }
});

export default app;
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import UserModel from '../models/user.model';


dotenv.config();

export const AppDataSource = new DataSource({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  host: 'localhost',
  type: 'postgres',
  synchronize: true,
  entities: [UserModel],
});
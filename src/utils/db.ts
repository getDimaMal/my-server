import dotenv from 'dotenv';
import { Pool } from 'pg';


dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: Number(process.env.POSTGRES_PORT),
  host: 'localhost',
});

pool.on('connect', () => {
  console.log('Connected to the PostgresSQL database.');
});

export default pool;
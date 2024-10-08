import dotenv from 'dotenv';
import { createClient } from 'redis';


dotenv.config();

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on('connect', () => console.log('Connected to the Redis server'));

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => await redisClient.connect())();

export default redisClient;
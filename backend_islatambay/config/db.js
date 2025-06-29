import { Pool } from "pg";
import env from "dotenv";

env.config();

export const pool = new Pool({
  user: process.env.POOL_USER,
  host: process.env.POOL_HOST,
  password: process.env.POOL_PASSWORD,
  database: process.env.POOL_DATABASE,
  port: process.env.POOL_PORT,
});

pool.connect();

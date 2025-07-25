import { config } from "dotenv";
config();

import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DBNAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export default pool;

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error("connection error ", err.message);
  } else {
    console.log(`connected to ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  }
});

export default pool;

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "foodhelper_bd"
})

export default pool
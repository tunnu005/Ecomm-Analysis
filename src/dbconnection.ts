import pkg from 'pg';  // Importing the Pool class from the pg module

const { Pool } = pkg
// Define the configuration type for the pool
interface PoolConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}
const poolConfig: PoolConfig = {
    user: 'myuser',
    host: 'localhost',
    database: 'ecomm-1',
    password: '1234',
    port: 5432,
  };

// const poolConfig = JSON.parse(consul.kv.get('config/db/pool'))


export const pool = new Pool(poolConfig);
// Create a function to initialize and test the database connection
export const initializeDatabase = async () => {
 

  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful:', res.rows[0]);
  } catch (err) {
    console.error('Connection error:', (err as Error).message);
  } finally {
    await pool.end();  // Close the connection pool
  }
};
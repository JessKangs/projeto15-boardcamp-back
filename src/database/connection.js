import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connection = new Pool({
    //connectionString: process.env.DATABASE_URL,
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'HTSIO7',
    database: 'testes'

  });

  export default connection;
import { createConnection } from 'typeorm';
import path from 'path';

export const DBconnection = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // All my entities, entity = table in postgres
      entities: [path.join(__dirname, '../entities/**/**.ts')],
      // Syncronize all my entities with my Database
      synchronize: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to Postgres');
  }
};

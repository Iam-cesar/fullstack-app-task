import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};

import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import fs from 'fs';
import path from 'path';

dotenv.config();

export const databaseConfig: SequelizeModuleOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: (process.env.DB_PORT as unknown as number) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydatabase',
  dialect: (process.env.DIALECT as unknown as Dialect) || 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: fs.readFileSync(path.resolve(process.cwd(), 'ca.pem')).toString(),
    },
  },
};

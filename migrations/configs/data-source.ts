/*
 * This file provides necessary credentials and configuration for running
 * TypeORM migration related commands. E.g.,
 * `pnpm typeorm migration:run -- -d .\migrations\configs\data-source.ts`
 * See the official documentation for more details: https://typeorm.io/migrations#running-and-reverting-migrations.
 */
import { DataSource } from 'typeorm';
import * as process from 'node:process';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({
  path: `.env${!process.env.NODE_ENV ? '' : `.${process.env.NODE_ENV}`}`,
});

export const dataSource = new DataSource({
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: 5432,
  username: `${process.env.POSTGRES_USERNAME}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DBNAME}`,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
  synchronize: false,
});

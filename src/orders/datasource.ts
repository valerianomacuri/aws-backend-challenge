import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Order } from './order.entity';
import { envs } from '../config/envs';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: envs.postgresUrl,
  synchronize: true, // solo para desarrollo
  logging: false,
  entities: [Order],
});

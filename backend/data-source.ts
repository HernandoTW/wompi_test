import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,  
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // Cargar las entidades
  migrations: [__dirname + '/migrations/*{.ts,.js}'], // Ruta para las migraciones
  synchronize: false, // No usar synchronize en producción, usar migraciones
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Configurar SSL para producción
});

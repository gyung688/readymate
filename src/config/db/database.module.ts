import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import dbConfig from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (db: ConfigType<typeof dbConfig>): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.database,
        synchronize: db.synchronize,
        autoLoadEntities: true,
        logging: process.env.NODE_ENV !== 'production',
        // pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
      }),
    }),
  ],
  // exports: [TypeOrmModule],
})
export class DatabaseModule {}

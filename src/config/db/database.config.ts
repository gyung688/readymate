import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const dbValidationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().allow('').default(''),
  DB_NAME: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
  NODE_ENV: Joi.string().valid('local', 'dev', 'prod').default('local'),
});

export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
};

export default registerAs<DatabaseConfig>('db', () => {
  // const decryptedPassword = decryptAesGcmBase64(
  //   process.env.DB_PASS_ENC!,
  //   process.env_DB_PASS_IV,
  //   process.env_DB_PASS_KEY,
  // );

  console.log('DB_HOST: ', process.env.DB_HOST);

  return {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER!,
    password: process.env.DB_PASS ?? '',
    database: process.env.DB_NAME!,
    synchronize: String(process.env.DB_SYNC).toLowerCase() === 'true',
  };
});

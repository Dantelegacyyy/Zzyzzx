import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  CLIENT_ORIGIN: z.string().optional().default('http://localhost:3000'),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default('gemini-2.5-flash'),
  CANVAS_TOKEN_ENCRYPTION_KEY_B64: z.string().optional(),
  CANVAS_PROVIDERS_JSON: z.string().default('[]'),
  AI_STUDIO_PREVIEW_EMBED: z
    .string()
    .optional()
    .default('false')
    .transform((value) => value.toLowerCase() === 'true'),
  SQL_HOST: z.string().optional(),
  SQL_USER: z.string().optional(),
  SQL_PASSWORD: z.string().optional(),
  SQL_DB_NAME: z.string().optional(),
  JWT_SECRET: z.string().default('cerebro_aegis_jwt_secret_key_production_2026_super_secure'),
  REDIS_URL: z.string().optional(),
});

let env: z.infer<typeof EnvSchema>;
try {
  env = EnvSchema.parse(process.env);
} catch (error) {
  console.warn('Warning parsing environment variables:', error);
  env = {
    NODE_ENV: (process.env.NODE_ENV as any) || 'development',
    PORT: Number(process.env.PORT) || 3000,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    CANVAS_TOKEN_ENCRYPTION_KEY_B64: process.env.CANVAS_TOKEN_ENCRYPTION_KEY_B64,
    CANVAS_PROVIDERS_JSON: process.env.CANVAS_PROVIDERS_JSON || '[]',
    AI_STUDIO_PREVIEW_EMBED: process.env.AI_STUDIO_PREVIEW_EMBED === 'true',
    SQL_HOST: process.env.SQL_HOST,
    SQL_USER: process.env.SQL_USER,
    SQL_PASSWORD: process.env.SQL_PASSWORD,
    SQL_DB_NAME: process.env.SQL_DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET || 'cerebro_aegis_jwt_secret_key_production_2026_super_secure',
    REDIS_URL: process.env.REDIS_URL,
  };
}

export const ENV = env;

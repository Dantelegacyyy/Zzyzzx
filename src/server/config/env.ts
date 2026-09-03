import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3001),
  CLIENT_ORIGIN: z.string().default('http://localhost:3000'),
  FIREBASE_PROJECT_ID: z.string().default('dependable-period-7ds98'),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default('gemini-3.7-flash'),
  CANVAS_TOKEN_ENCRYPTION_KEY_B64: z.string().optional(),
  CANVAS_PROVIDERS_JSON: z.string().default('[]'),
  AI_STUDIO_PREVIEW_EMBED: z
    .string()
    .optional()
    .default('false')
    .transform((value) => value.toLowerCase() === 'true'),
});

// Since the dev server spins up dynamically with vite acting as proxy on port 3000,
// and the backend is trying to spin up on 3001, we ensure it properly binds.
let env: z.infer<typeof EnvSchema>;
try {
  env = EnvSchema.parse(process.env);
} catch (error) {
  console.error('Invalid environment variables:', error);
  process.exit(1);
}

export const ENV = env;

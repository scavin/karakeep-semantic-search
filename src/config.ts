import { z } from "zod";

// Treat empty strings as undefined for optional env vars
const optionalString = z
  .string()
  .transform((v) => (v === "" ? undefined : v))
  .pipe(z.string().optional());

const optionalUrl = z
  .string()
  .transform((v) => (v === "" ? undefined : v))
  .pipe(z.string().url().optional());

const envSchema = z.object({
  // Karakeep
  KARAKEEP_URL: z.string().url(),
  KARAKEEP_API_KEY: z.string().min(1),

  // Embeddings - one of these required
  OPENAI_API_KEY: optionalString,
  OPENAI_BASE_URL: optionalUrl,
  OLLAMA_URL: optionalUrl,
  EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),

  // Qdrant
  QDRANT_URL: z.string().url().default("http://localhost:6333"),
  QDRANT_COLLECTION: z.string().default("karakeep_bookmarks"),

  // Sync
  SYNC_INTERVAL_MINUTES: z.coerce.number().default(5),

  // Server
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

  // Authentication (optional - when set, all requests require Bearer token)
  API_KEY: optionalString,
});

function validateConfig() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.format());
    process.exit(1);
  }

  const config = parsed.data;

  // Ensure at least one embedding provider is configured
  if (!config.OPENAI_API_KEY && !config.OLLAMA_URL) {
    console.error("❌ Either OPENAI_API_KEY or OLLAMA_URL must be set");
    process.exit(1);
  }

  return config;
}

export const config = validateConfig();

export type Config = typeof config;

export const env = {
  PORT: Number(process.env.PORT || 4000),
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/fm",
  JWT_SECRET: process.env.JWT_SECRET || "dev",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  PI_ENV: process.env.PI_ENV || "mock",
};

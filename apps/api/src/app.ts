import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";

export const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || "*", credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 60_000, max: 300 }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", routes);

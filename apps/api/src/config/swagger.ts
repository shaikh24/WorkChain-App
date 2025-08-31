import swaggerUi from "swagger-ui-express";
import { Router } from "express";
const spec = { openapi: "3.0.0", info: { title: "FM API", version: "1.0.0" }, paths: {
  "/api/health": { get: { responses: { "200": { description: "ok" } } } }
}};
export function mountSwagger(router: Router){ router.use("/docs", swaggerUi.serve, swaggerUi.setup(spec as any)); }

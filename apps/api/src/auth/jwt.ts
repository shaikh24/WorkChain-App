import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload { sub: string; role: "client"|"freelancer"|"admin"; type: "access"|"refresh"; }

export function signAccess(sub: string, role: JwtPayload["role"]) {
  return jwt.sign({ sub, role, type: "access" }, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_EXPIRES || "15m" });
}
export function signRefresh(sub: string, role: JwtPayload["role"]) {
  return jwt.sign({ sub, role, type: "refresh" }, env.JWT_REFRESH_SECRET, { expiresIn: env.REFRESH_EXPIRES || "7d" });
}
export function verifyAccess(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
}
export function verifyRefresh(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
}

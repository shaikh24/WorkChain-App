import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { env } from "../config/env";

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_ACCESS_SECRET
}, (payload: any, done) => {
  if (payload?.type !== "access") return done(null, false);
  return done(null, { id: payload.sub, role: payload.role });
}));

export { passport };

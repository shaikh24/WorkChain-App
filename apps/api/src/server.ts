import http from "http";
import mongoose from "mongoose";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { createSocket } from "./realtime/socket.js";

async function main(){
  await mongoose.connect(env.MONGO_URI);
  const server = http.createServer(app);
  createSocket(server);
  server.listen(env.PORT, ()=> console.log("API on", env.PORT));
}
main().catch((e)=>{ console.error(e); process.exit(1); });

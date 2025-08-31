import { Server } from "socket.io";
import http from "http";
export function createSocket(server: http.Server){
  const io = new Server(server, { cors: { origin: process.env.CORS_ORIGIN || "*" } });
  io.on("connection", (socket)=>{
    socket.on("join", (roomId: string)=> socket.join(roomId));
    socket.on("message", ({ roomId, payload })=> io.to(roomId).emit("message", payload));
  });
  return io;
}

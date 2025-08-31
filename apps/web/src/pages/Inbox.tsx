import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { getSocket } from "../lib/socket";

export default function Inbox() {
  const [roomId, setRoom] = useState("demo-room");
  const [text, setText] = useState("");
  const [log, setLog] = useState<string[]>([]);
  useEffect(()=>{
    const s = getSocket();
    s.emit("join", roomId);
    const onMsg = (p:any)=> setLog(l=>[...l, p?.text || JSON.stringify(p)]);
    s.on("message", onMsg);
    return ()=> { s.off("message", onMsg); };
  }, [roomId]);
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-3">
      <Card>
        <div className="flex gap-2">
          <Input value={roomId} onChange={e=>setRoom(e.target.value)} />
          <Input value={text} onChange={e=>setText(e.target.value)} placeholder="Type message" />
          <Button onClick={()=>{ getSocket().emit('message', { roomId, payload: { text } }); setText(''); }}>Send</Button>
        </div>
        <div className="mt-4 space-y-2 text-sm">{log.map((l,i)=>(<div key={i}>{l}</div>))}</div>
      </Card>
    </div>
  );
}

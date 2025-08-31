import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Card } from "../components/ui/Card";

export default function Jobs(){
  const { data } = useQuery({ queryKey: ['jobs'], queryFn: async()=> (await api.get('/jobs')).data });
  const items = data?.items ?? [];
  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-4">
      {items.map((j:any)=>(<Card key={j._id}><div className="font-semibold">{j.title}</div><div className="opacity-70 text-sm">{j.description}</div></Card>))}
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Card } from "../components/ui/Card";
import { useAuth } from "../lib/auth";

export default function Admin(){
  const access = useAuth(s=>s.access);
  const { data } = useQuery({ queryKey: ['metrics'], queryFn: async()=> (await api.get('/admin/metrics',{ headers: access? { Authorization: `Bearer ${access}` }: {} })).data });
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card><div className="font-semibold">Admin Metrics</div>
      <pre className="text-sm mt-2">{JSON.stringify(data, null, 2)}</pre></Card>
    </div>
  );
}

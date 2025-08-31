import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Card } from "../components/ui/Card";
import { useAuth } from "../lib/auth";

export default function Wallet(){
  const access = useAuth(s=>s.access);
  const { data } = useQuery({ queryKey: ['wallet'], queryFn: async()=> (await api.get('/wallets/balances',{ headers: access? { Authorization: `Bearer ${access}` }: {} })).data });
  const b = data?.balance || { earned:0, held:0, spent:0 };
  return (
    <div className="max-w-xl mx-auto p-6">
      <Card><div className="text-lg font-semibold">Wallet</div>
      <div className="mt-2 text-sm">Earned: {b.earned} Pi</div>
      <div className="text-sm">Held: {b.held} Pi</div>
      <div className="text-sm">Spent: {b.spent} Pi</div></Card>
    </div>
  );
}

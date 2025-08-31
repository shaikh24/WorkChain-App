import { useState } from "react";
import { api } from "../lib/axios";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useToast } from "../components/Toaster";
import { useAuth } from "../lib/auth";

export default function OrdersDemo() {
  const { push } = useToast();
  const { access } = useAuth();
  const [sellerId, setSellerId] = useState("");
  const [total, setTotal] = useState(1);
  const [orderId, setOrderId] = useState<string|undefined>();

  async function createOrder() {
    try {
      const { data } = await api.post("/orders", {
        sellerId,
        source: "gig",
        totalAmountPi: Number(total),
        milestones: [{ title: "Work", amountPi: Number(total) }]
      }, { headers: access ? { Authorization: `Bearer ${access}` } : {} });
      setOrderId(data.item._id);
      push({ title: "Order created", description: data.item._id });
    } catch (e:any) {
      push({ title: "Error", description: e?.response?.data?.error || "Failed" });
    }
  }

  async function fund() {
    if (!orderId) return;
    const { data } = await api.post(`/orders/${orderId}/fund`, { milestoneIndex: 0 }, { headers: access ? { Authorization: `Bearer ${access}` } : {} });
    push({ title: "Escrow funded", description: data.payment.id });
  }

  async function release() {
    if (!orderId) return;
    const { data } = await api.post(`/orders/${orderId}/release`, { milestoneIndex: 0 }, { headers: access ? { Authorization: `Bearer ${access}` } : {} });
    push({ title: "Released", description: data.item.escrowStatus });
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <Card className="space-y-3">
        <div className="font-semibold">Create Order</div>
        <Input placeholder="Seller User ID (Mongo ObjectId)" value={sellerId} onChange={e=>setSellerId(e.target.value)} />
        <Input placeholder="Amount in Pi" value={total} type="number" onChange={e=>setTotal(Number(e.target.value))} />
        <Button onClick={createOrder}>Create</Button>
      </Card>
      {orderId && (
        <Card className="space-x-2">
          <Button onClick={fund}>Fund (init+approve)</Button>
          <Button onClick={release}>Release (complete)</Button>
        </Card>
      )}
    </div>
  );
}

import { PiAdapter, CreatePaymentInput, PaymentIntent } from "./pi.types";
function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }
export const PiMockAdapter: PiAdapter = {
  async createPayment(input: CreatePaymentInput): Promise<PaymentIntent> {
    await delay(50);
    return { id: "mock_"+Math.random().toString(36).slice(2), status: "pending_approval", amountPi: input.amountPi };
  },
  async approvePayment(id: string) { await delay(50); return { id, status: "held", amountPi: 0 }; },
  async completePayment(id: string) { await delay(50); return { id, status: "completed", amountPi: 0 }; },
  async cancelPayment(id: string) { await delay(50); return { id, status: "canceled", amountPi: 0 }; }
};

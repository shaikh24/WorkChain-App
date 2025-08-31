export type PiPaymentStatus = "pending"|"pending_approval"|"held"|"completed"|"canceled";
export interface CreatePaymentInput { amountPi: number; metadata: Record<string, any>; }
export interface PaymentIntent { id: string; status: PiPaymentStatus; amountPi: number; }
export interface PiAdapter {
  createPayment(input: CreatePaymentInput): Promise<PaymentIntent>;
  approvePayment(id: string): Promise<PaymentIntent>;
  completePayment(id: string): Promise<PaymentIntent>;
  cancelPayment(id: string): Promise<PaymentIntent>;
}

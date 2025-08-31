import mongoose, { Schema } from "mongoose";

export interface ITransaction {
  type: "fund"|"release"|"refund";
  amountPi: number;
  orderId?: mongoose.Types.ObjectId;
  milestoneId?: mongoose.Types.ObjectId;
  piPaymentId?: string;
  status: "pending"|"succeeded"|"failed";
}

const TransactionSchema = new Schema<ITransaction>({
  type: { type: String, enum: ["fund","release","refund"], required: true },
  amountPi: { type: Number, required: true },
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  milestoneId: { type: Schema.Types.ObjectId },
  piPaymentId: String,
  status: { type: String, enum: ["pending","succeeded","failed"], default: "pending" }
}, { timestamps: true });

export const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);

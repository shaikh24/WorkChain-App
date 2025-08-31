import mongoose, { Schema } from "mongoose";

export interface IDispute {
  orderId: mongoose.Types.ObjectId;
  raisedBy: mongoose.Types.ObjectId;
  reason: string;
  messages: { senderId: mongoose.Types.ObjectId; text: string; createdAt: Date }[];
  resolution?: "refund"|"release"|"split";
  resolvedBy?: mongoose.Types.ObjectId;
  split?: { buyer: number; seller: number };
  status: "open"|"resolved";
}

const DisputeSchema = new Schema<IDispute>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true, index: true },
  raisedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reason: String,
  messages: [{ senderId: { type: Schema.Types.ObjectId, ref: "User" }, text: String, createdAt: { type: Date, default: Date.now } }],
  resolution: { type: String, enum: ["refund","release","split"], default: undefined },
  resolvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  split: { buyer: Number, seller: Number },
  status: { type: String, enum: ["open","resolved"], default: "open" }
}, { timestamps: true });

export const Dispute = mongoose.model<IDispute>("Dispute", DisputeSchema);

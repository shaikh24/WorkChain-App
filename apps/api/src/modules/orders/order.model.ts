import mongoose, { Schema } from "mongoose";

export interface IMilestone {
  title: string;
  amountPi: number;
  dueAt?: Date;
  status: "pending"|"funded"|"delivered"|"released"|"refunded";
  escrowPaymentId?: string;
  releasedAt?: Date;
}
export interface IOrder {
  buyerId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  source: "gig"|"job";
  gigId?: mongoose.Types.ObjectId;
  jobId?: mongoose.Types.ObjectId;
  milestones: IMilestone[];
  escrowStatus: "unfunded"|"held"|"released"|"refunded";
  totalAmountPi: number;
  status: "created"|"in_progress"|"delivered"|"completed"|"canceled";
}

const MilestoneSchema = new Schema<IMilestone>({
  title: { type: String, required: true },
  amountPi: { type: Number, required: true },
  dueAt: Date,
  status: { type: String, enum: ["pending","funded","delivered","released","refunded"], default: "pending" },
  escrowPaymentId: String,
  releasedAt: Date
}, { _id: true });

const OrderSchema = new Schema<IOrder>({
  buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  source: { type: String, enum: ["gig","job"], required: true },
  gigId: { type: Schema.Types.ObjectId, ref: "Gig" },
  jobId: { type: Schema.Types.ObjectId },
  milestones: { type: [MilestoneSchema], default: [] },
  escrowStatus: { type: String, enum: ["unfunded","held","released","refunded"], default: "unfunded", index: true },
  totalAmountPi: { type: Number, required: true },
  status: { type: String, enum: ["created","in_progress","delivered","completed","canceled"], default: "created", index: true }
}, { timestamps: true });

export const Order = mongoose.model<IOrder>("Order", OrderSchema);

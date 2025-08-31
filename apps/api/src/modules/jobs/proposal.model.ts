import mongoose, { Schema } from "mongoose";

export interface IProposal {
  jobId: mongoose.Types.ObjectId;
  freelancerId: mongoose.Types.ObjectId;
  cover: string;
  bidAmount: number;
  milestones: { title: string; amountPi: number }[];
  attachments: string[];
  status: "submitted"|"accepted"|"declined";
}

const ProposalSchema = new Schema<IProposal>({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true, index: true },
  freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  cover: String,
  bidAmount: Number,
  milestones: [{ title: String, amountPi: Number }],
  attachments: { type: [String], default: [] },
  status: { type: String, enum: ["submitted","accepted","declined"], default: "submitted", index: true }
}, { timestamps: true });

export const Proposal = mongoose.model<IProposal>("Proposal", ProposalSchema);

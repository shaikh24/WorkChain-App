import mongoose, { Schema } from "mongoose";

export interface IJob {
  clientId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  budgetType: "fixed"|"hourly";
  budgetRange?: { min?: number; max?: number };
  attachments: string[];
  status: "open"|"closed";
}

const JobSchema = new Schema<IJob>({
  clientId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: { type: String, required: true, index: "text" },
  description: { type: String, required: true, index: "text" },
  budgetType: { type: String, enum: ["fixed","hourly"], default: "fixed" },
  budgetRange: { min: Number, max: Number },
  attachments: { type: [String], default: [] },
  status: { type: String, enum: ["open","closed"], default: "open", index: true }
}, { timestamps: true });

export const Job = mongoose.model<IJob>("Job", JobSchema);

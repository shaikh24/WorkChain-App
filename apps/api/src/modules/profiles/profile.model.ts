import mongoose, { Schema } from "mongoose";

export interface IProfile {
  userId: mongoose.Types.ObjectId;
  displayName?: string;
  bio?: string;
  skills: string[];
  languages: string[];
  hourlyRate?: number;
  badges: string[];
  kycStatus?: string;
}

const ProfileSchema = new Schema<IProfile>({
  userId: { type: Schema.Types.ObjectId, ref: "User", unique: true, index: true },
  displayName: String,
  bio: String,
  skills: { type: [String], default: [] },
  languages: { type: [String], default: [] },
  hourlyRate: Number,
  badges: { type: [String], default: [] },
  kycStatus: String
}, { timestamps: true });

export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);

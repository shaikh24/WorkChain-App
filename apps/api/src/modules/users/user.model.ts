import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  passwordHash: string;
  role: "client"|"freelancer"|"admin";
  status: "active"|"banned";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["client","freelancer","admin"], default: "client" },
  status: { type: String, enum: ["active","banned"], default: "active" }
}, { timestamps: { createdAt: true, updatedAt: true } });

export const User = mongoose.model<IUser>("User", UserSchema);

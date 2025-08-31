import mongoose, { Schema } from "mongoose";

export interface IMessage {
  roomId: string; // order:<id> or job:<id> or proposal:<id>
  senderId: mongoose.Types.ObjectId;
  text?: string;
  files: string[];
  system?: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  roomId: { type: String, index: true },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: String,
  files: { type: [String], default: [] },
  system: { type: Boolean, default: false }
}, { timestamps: { createdAt: true, updatedAt: false } });

MessageSchema.index({ roomId: 1, createdAt: -1 });

export const Message = mongoose.model<IMessage>("Message", MessageSchema);

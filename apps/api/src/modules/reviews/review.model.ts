import mongoose, { Schema } from "mongoose";

export interface IReview {
  orderId: mongoose.Types.ObjectId;
  reviewerId: mongoose.Types.ObjectId;
  revieweeId: mongoose.Types.ObjectId;
  rating: number;
  text?: string;
}

const ReviewSchema = new Schema<IReview>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true, index: true },
  reviewerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  revieweeId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  rating: { type: Number, min: 1, max: 5, required: true, index: true },
  text: String
}, { timestamps: true });

ReviewSchema.index({ text: "text" });

export const Review = mongoose.model<IReview>("Review", ReviewSchema);

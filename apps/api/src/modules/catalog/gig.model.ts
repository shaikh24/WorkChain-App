import mongoose, { Schema } from "mongoose";

export interface IPackage { name: string; pricePi: number; deliveryDays: number; revisions: number }
export interface IGig {
  userId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  packages: IPackage[];
  tags: string[];
  categoryId?: mongoose.Types.ObjectId;
  rating?: number;
  ordersCount?: number;
  isActive: boolean;
}

const PackageSchema = new Schema<IPackage>({ name: String, pricePi: Number, deliveryDays: Number, revisions: Number }, { _id: false });
const GigSchema = new Schema<IGig>({
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  title: String,
  slug: { type: String, unique: true, index: true },
  description: String,
  packages: { type: [PackageSchema], default: [] },
  tags: { type: [String], default: [] },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  rating: { type: Number, default: 0 },
  ordersCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

GigSchema.index({ title: "text", description: "text" });

export const Gig = mongoose.model<IGig>("Gig", GigSchema);

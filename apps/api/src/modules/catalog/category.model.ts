import mongoose, { Schema } from "mongoose";
export interface ICategory { name: string; slug: string; parentId?: mongoose.Types.ObjectId | null }
const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  parentId: { type: Schema.Types.ObjectId, default: null }
}, { timestamps: true });
export const Category = mongoose.model<ICategory>("Category", CategorySchema);

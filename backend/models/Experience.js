
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    about: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);

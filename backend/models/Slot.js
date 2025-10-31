// models/Slot.js
import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    capacity: { type: Number, default: 5 },
    booked: { type: Number, default: 0 },
    isSoldOut: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Slot", slotSchema);

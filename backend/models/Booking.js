// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    name: { type: String },
    email: { type: String },
    quantity: { type: Number, default: 1 },
    subtotal: { type: Number },
    tax: { type: Number },
    total: { type: Number },
    promoCode: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

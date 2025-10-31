import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";
import Slot from "../models/Slot.js";

export const createBooking = async (req, res) => {
    try {
        const { experienceId,
            slotId,
            name,
            email,
            quantity,
            subtotal,
            discount,
            tax,
            total,
            promoCode} = req.body

        if (!experienceId || !slotId || !email || !name || !total) {
            return res.status(400).json({ message: "Missing booking details" });
        }


        const experience = await Experience.findById(experienceId);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        const pricePerTicket = experience.price;
        const calculatedSubtotal = (pricePerTicket * quantity)-discount;
         
        const calculatedTax = Math.floor(calculatedSubtotal * 0.18).toFixed(2); // GST 18%
        const calculatedTotal = calculatedSubtotal + Number(calculatedTax);

        if (
            Math.round(calculatedSubtotal) !== Math.round(subtotal) ||
            Math.round(calculatedTax) !== Math.round(Number(tax)) ||
            Math.round(calculatedTotal) !== Math.round(total)
        ) {
            console.table([calculatedSubtotal,calculatedTax,calculatedTotal])
            return res.status(400).json({ message: "Price Tampered " });
        }
        const slot = await Slot.findById(slotId);
        if (!slot || slot.experience.toString() !== experienceId) {
            return res.status(400).json({ message: "Invalid Slot" });
        }

        if (slot.booked + quantity > slot.capacity) {
            return res.status(400).json({ message: 'Not enough slots available' })
        }

        const alreadyBooked = await Booking.findOne({ email, slot: slotId });
        if (alreadyBooked) {
            return res.status(400).json({
                message: "You already booked this slot"
            });
        }


        const booking = await Booking.create({
            experience: experienceId,
            slot: slotId,
            name,
            email,
            quantity,
            subtotal,
            tax,
            total,
            promoCode
        });

        slot.booked += quantity;
        if (slot.booked >= slot.capacity) slot.isSoldOut = true;
        await slot.save();

        return res.status(201).json({
            message: "Booking successful",
            booking
        });



    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}
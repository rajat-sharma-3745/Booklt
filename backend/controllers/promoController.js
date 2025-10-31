import { promoCodes } from "../data/promoCodes.js";


export const validatePromo = (req, res) => {
    try {
        const { subTotal, code } = req.body
        const promo = promoCodes.find(item => item.code === code);

        if (!promo) {
            return res.status(404).json({success:false, message: "Invalid promo code " });
        }
        if (promo.expiryDate && new Date() > promo.expiryDate) {
            return res.status(400).json({success:false, message: "Promo code expired " });
        }

        if (promo.minAmount && subTotal < promo.minAmount) {
            return res.status(400).json({success:false,
                message: `Minimum purchase ₹${promo.minAmount} required`
            });
        }

        let discount = 0;
        if (promo.type === "percentage") {
            discount = Math.min(subTotal * (promo.value / 100));
        } else if (promo.type === "flat") {
            discount = promo.value;
        }
        
        const newTotal = Number(subTotal) - Number(discount);

        return res.json({
            success:true,
            message: "Promo code applied ✅",
            discount,
            newTotal
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.message });
    }
}
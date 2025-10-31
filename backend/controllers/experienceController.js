import Experience from "../models/Experience.js";
import Slot from "../models/Slot.js";

export const getExperiences = async (req, res) => {
    try {
        const exps = await Experience.find()
            .select("name location price description imageUrl");

        res.status(200).json(exps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await Experience.findById(id).lean();
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        const slots = await Slot.find({ experience: id }).select('date time capacity booked isSoldOut').lean();
        // we want to send the experience along with the schedule like {...experience,schedule}

        // first of all we have to map dates with their time slots(documents)
        
        const schedule = slots.reduce((acc,slot)=>{
            const {date,...rest} = slot;
            
            if (!acc[date]) acc[date] = [];
            acc[date].push(rest);
            return acc;
            
        },{})
        // after this we get the object with structure like {'date':[{},{}]}
        // const schedule = Object.entries(slotObjs).map(([date,times])=>({
        //     date,times
        // }))
        // schedule will be an array, containing objects for dates 

        res.json({...experience,schedule})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

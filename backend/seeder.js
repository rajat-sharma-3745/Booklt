import mongoose from "mongoose";
import dotenv from 'dotenv'
import Experience from "./models/Experience.js";
import { experiencesData } from "./data/experiences.js";
import Slot from "./models/Slot.js";

dotenv.config({path:'./.env'})

const dates = ["Oct 22", "Oct 23", "Oct 24", "Oct 25"];
const times = ["07:00 am", "09:00 am", "11:00 am", "01:00 pm"];


const seed = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected");

        await Experience.deleteMany()
        await Slot.deleteMany()

        const insertedExperiences = await Experience.insertMany(experiencesData)
        console.log('Experience seeded');

        let slotDocuments = [];

    insertedExperiences.forEach((exp) => {
      dates.forEach((date) => {
        times.forEach((time) => {
          slotDocuments.push({
            experience: exp._id,
            date,
            time,
            capacity: 5,
            booked: 0,
            isSoldOut: false
          });
        });
      });
    });

    await Slot.insertMany(slotDocuments);
    console.log("Slots Seeded Successfully");

    process.exit();
    } catch (error) {
        console.error(err);
    process.exit(1);
    }
}

seed();



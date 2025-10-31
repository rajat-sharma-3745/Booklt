import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import experienceRoutes from './routes/experienceRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import promoRoutes from './routes/promoRoutes.js'

dotenv.config();


const app = express();
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to Ecom cart');
})


// routes

app.use('/api/experiences',experienceRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/promo", promoRoutes);



connectDb().then(()=>{
    app.listen(PORT,()=>console.log('Server Running on port',PORT))
})

import { CheckCircle } from 'lucide-react';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Result = () => {
   const location = useLocation();
   const {bookingId} = location.state || {};
  const navigate = useNavigate();
  const {setBookingDetails} = useAppContext();

  useEffect(()=>{
    setBookingDetails({});
  },[])

  return (
    <div className=" flex flex-col justify-center items-center py-3 text-center px-4">
      {/* Success Icon */}
      <div className="bg-green-500 rounded-full p-4 mb-6">
        <CheckCircle className="text-white w-10 h-10" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-black">
        Booking Confirmed
      </h2>

      {/* Ref Code */}
      <p className="text-gray-600 mt-1 text-sm">
        Ref ID: {bookingId}
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-gray-200 text-gray-800 font-medium px-5 py-2 rounded-md hover:bg-gray-300 transition"
      >
        Back to Home
      </button>
    </div>
  );
}

export default Result
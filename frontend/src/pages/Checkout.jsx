import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { toast } from "sonner";

const Checkout = () => {
  const { bookingDetails, setBookingDetails } = useAppContext();
  const [accept, setAccept] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discount,setDiscount]=useState(0)
  const navigate = useNavigate();
  let codeCount = useRef(0);
  const validatePromo = async () => {
    try {
      if (!code) return;
      if (codeCount.current != 0) {
        toast.info("Promo code can be applied only once");
        return;
      }
      const { data } = await axiosInstance.post(API_PATHS.PROMO.VALIDATE, {
        subTotal: bookingDetails?.subtotal,
        code,
      });

      toast.success(data?.message);
      codeCount.current++;
      const subtotal = data.newTotal;

      setDiscount(data?.discount)
      const taxRate = 0.18;
      const tax = Math.floor(subtotal * taxRate).toFixed(2);
      const total = subtotal + Number(tax);
      setBookingDetails((prev) => ({ ...prev, subtotal, tax, total}));
    } catch (error) {
      toast.warning(error?.response?.data?.message);
    }
  };
  // booking api call
  const createBooking = async()=>{
    try {
      const {data} = await axiosInstance.post(API_PATHS.BOOKING.CREATE,{...bookingDetails,email,name,discount,promoCode:code});
      toast.success(data?.message);
      navigate('/result',{state:{bookingId:data?.booking?._id}})
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    if (!Object.keys(bookingDetails).length) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 xl:px-32 py-6 sm:px-6">
      <button
        onClick={() => {navigate(-1);scrollTo(0,0)}}
        className="cursor-pointer flex items-center gap-2 text-gray-700 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Details</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#F5F5F5] rounded-xl p-5 space-y-5 h-max shadow-md">
          <div className="flex flex-col sm:flex-row gap-4  ">
            <div className="w-full">
              <label className="text-sm text-gray-600">Full name</label>
              <input
                type="text"
                value={name}
                onChange={({ target }) => setName(target.value)}
                placeholder="John Doe"
                className="w-full mt-1 p-3 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-gray-600 outline-none"
              />
            </div>

            <div className="w-full">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="test@test.com"
                className="w-full mt-1 p-3 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-gray-600 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={code}
              disabled={codeCount.current}
              onChange={({ target }) => setCode(target.value)}
              placeholder="Promo code"
              className="flex-1 p-3 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-gray-600 outline-none"
            />
            <button
              onClick={validatePromo}
              className="bg-black text-white px-5 py-3 rounded-lg text-sm font-semibold hover:opacity-90"
            >
              Apply
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              onClick={() => setAccept((p) => !p)}
              type="checkbox"
              className="h-4 w-4"
            />
            I agree to the terms and safety policy
          </label>
        </div>

        <div className="bg-[#EFEFEF] rounded-xl shadow-md  p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#656565]">Experience</span>
            <span>{bookingDetails?.expName}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date</span>
            <span>
              {new Date(
                `${bookingDetails?.selectedDate} 2025`
              ).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Time</span>
            <span>{bookingDetails?.time}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Quantity</span>
            <span>{bookingDetails?.quantity}</span>
          </div>

          <div className="border-t my-2"></div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>₹{bookingDetails?.subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Taxes</span>
            <span>₹{bookingDetails?.tax}</span>
          </div>

          <div className="border-t my-3"></div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{bookingDetails?.total}</span>
          </div>

          <button
          onClick={createBooking}
            disabled={!accept || !name || !email}
            className="w-full py-3 bg-[#FFD643] rounded text-black disabled:bg-gray-200 disabled:text-gray-500  font-medium disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
          >
            Pay and Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

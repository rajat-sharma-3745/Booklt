import React, { useEffect, useState } from "react";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { data, useNavigate, useParams } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";
import ExperienceDetailsShimmer from "../components/DetailsShimmer";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookingDetails, setBookingDetails } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [experience, setExperience] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    bookingDetails?.selectedDate || null
  );
  const [selectedSlot, setSelectedSlot] = useState(
    bookingDetails?.slotId || {}
  );
  
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  useEffect(() => {
    const fetchExperience = async () => {
      const { data } = await axiosInstance.get(
        API_PATHS.EXPERIENCE.GETBYID(id)
      );
      setExperience(data);
      if(!selectedDate) setSelectedDate(Object.keys(data?.schedule)[0]);
    };
    fetchExperience();
  }, []);

  if (!experience) return <ExperienceDetailsShimmer/>;

  const dates = Object.keys(experience.schedule);

  //   for extracring the time slots of a particular date
  const slotsForSelectedDate = selectedDate
    ? experience.schedule[selectedDate]
    : [];

  const subtotal = experience?.price * quantity;
  const taxRate = 0.18;
  const tax = Math.floor(subtotal * taxRate).toFixed(2);
  const total = subtotal + Number(tax);
  const confirmHandler = () => {
    if(selectedSlot?.booked+quantity>selectedSlot.capacity){
      toast.info('Not enough slots available');
      return
    }
    setBookingDetails((p) => ({
      ...p,
      subtotal,
      tax,
      total,
      quantity,
    }));
    navigate("/checkout");
    scrollTo(0,0)
  };

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 xl:px-32 py-6">
      <button
        onClick={() => navigate(-1)}
        className=" cursor-pointer flex items-center gap-2 text-gray-700 mb-4"
      >
        <ArrowLeft size={20} />
        <span>Home</span>
      </button>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
        <div>
          <img
            src={experience.imageUrl}
            alt="Kayaking"
            className="w-full h-72 md:h-96 object-cover rounded-xl"
          />

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            {experience.name}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            {experience.description}
          </p>

          <h3 className="font-semibold mb-2">Choose date</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {dates.map((date, i) => (
              <button
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedSlot({});
                }}
                key={date}
                className={`px-4 py-2 rounded text-sm border ${
                  selectedDate === date
                    ? "bg-[#FFD643] border-transparent"
                    : "border-gray-300"
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {selectedDate && (
            <div>
              <h3 className="font-semibold mb-2">Choose time</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {slotsForSelectedDate.map((slot, i) => (
                  <button
                    onClick={() => {
                      setSelectedSlot(slot);
                      setBookingDetails((prev) => ({
                        ...prev,
                        expName: experience?.name,
                        experienceId: experience?._id,
                        slotId: slot._id,
                        selectedDate,
                        time: slot.time,
                      }));
                    }}
                    key={slot?._id}
                    disabled={slot?.isSoldOut}
                    className={`px-4 py-2 rounded border text-sm flex  ${
                      (selectedSlot._id?selectedSlot._id === slot._id:selectedSlot===slot._id)
                        ? "bg-[#FFD643] border-transparent"
                        : "border-gray-300"
                    } items-center gap-2 ${
                      slot.isSoldOut
                        ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {slot.time}{" "}
                    {slot.capacity - slot.booked && (
                      <span className="text-red-500 text-xs">
                        {slot.capacity - slot.booked} left
                      </span>
                    )}
                    {slot.isSoldOut && (
                      <span className="text-xs">Sold out</span>
                    )}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 mb-6">
                All times are in IST (GMT +5:30)
              </p>
            </div>
          )}

          <h3 className="font-semibold mb-2">About</h3>
          <div className="bg-gray-100 rounded px-4 py-3 text-sm text-gray-700">
            {experience?.about}
          </div>
        </div>

        <div className="bg-[#EFEFEF] rounded-xl shadow p-6 space-y-4 h-fit">
          <div className="flex justify-between text-gray-700">
            <span>Starts at</span>
            <span className="font-semibold">{experience?.price}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Quantity</span>
            <div className="flex items-center border rounded">
              <button
                className="px-2 py-1 border-r"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Minus size={14} />
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                className="px-2 py-1 border-l"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Taxes</span>
            <span className="font-semibold">₹{tax}</span>
          </div>

          <hr />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={confirmHandler}
            disabled={!selectedDate || !Object.keys(selectedSlot).length}
            className="w-full py-3 bg-[#FFD643] rounded text-black disabled:bg-gray-200 disabled:text-gray-500  font-medium disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;

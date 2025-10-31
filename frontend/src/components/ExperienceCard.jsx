import React from "react";
import { useNavigate } from "react-router-dom";

const ExperienceCard = ({ experience }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F0F0F0] rounded-xl shadow-sm overflow-hidden h-80 flex flex-col">
      <img
        src={experience?.imageUrl}
        alt={experience?.name}
        className="w-full h-44 object-cover"
      />

      <div className="p-3 flex flex-col flex-1  ">
        <div className="flex-1">
          <div className="flex  items-center justify-between mb-2">
            <h2 className="font-semibold text-lg text-[#262626]">
              {experience?.name}
            </h2>
            <span className="text-xs bg-[#D6D6D6] px-2 py-1 rounded">
              {experience?.location}
            </span>
          </div>

  
          <p className="text-sm  text-[#6C6C6C] font-normal tracking-normal leading-4">
            {experience?.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className=" text-[#262626] flex items-center gap-1">
            <span className="text-sm">From</span>{" "}
            <span className="text-black text-xl font-semibold">
              ₹{experience?.price}
            </span>
          </p>

          <button
            onClick={() => navigate(`/details/${experience._id}`)}
            className="bg-[#FFD643] text-sm text-black font-semibold cursor-pointer px-3 py-2 rounded"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;

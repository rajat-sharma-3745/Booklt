import React from "react";

export default function ExperienceCardShimmer() {
  const base = "bg-gray-200 animate-pulse rounded-md";

  return (
    <div className="bg-[#F0F0F0] rounded-xl shadow-sm overflow-hidden h-80 flex flex-col ">
      <div className={`${base} w-full h-44`} />

      <div className="p-3 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className={`${base} h-4 w-32`} />
            <div className={`${base} h-4 w-16 rounded`} />
          </div>

          <div className="space-y-2">
            <div className={`${base} h-3 w-full`} />
            <div className={`${base} h-3 w-5/6`} />
            <div className={`${base} h-3 w-4/6`} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <div className={`${base} h-4 w-12`} />
            <div className={`${base} h-5 w-14`} />
          </div>

          <div className={`${base} h-8 w-24 rounded-lg`} />
        </div>
      </div>
    </div>
  );
}

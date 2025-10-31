import React from "react";

export default function ExperienceDetailsShimmer() {
  const base = "bg-gray-200 animate-pulse rounded-md";

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 xl:px-32 py-6">
      {/* Back button shimmer */}
      <div className="flex items-center gap-2 text-gray-700 mb-4">
        <div className={`${base} w-5 h-5 rounded-full`} />
        <div className={`${base} w-16 h-4`} />
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
        {/* Left Section */}
        <div>
          {/* Image */}
          <div className={`${base} w-full h-72 md:h-96 rounded-xl mb-6`} />

          {/* Title */}
          <div className={`${base} h-6 w-2/3 mb-4`} />

          {/* Description */}
          <div className="space-y-2 mb-6">
            <div className={`${base} h-3 w-full`} />
            <div className={`${base} h-3 w-5/6`} />
            <div className={`${base} h-3 w-4/6`} />
          </div>

          {/* Date Heading */}
          <div className={`${base} h-4 w-28 mb-3`} />

          {/* Date buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`${base} h-8 w-20`} />
            ))}
          </div>

          {/* Time section heading */}
          <div className={`${base} h-4 w-28 mb-3`} />

          {/* Time buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${base} h-8 w-24`} />
            ))}
          </div>

          <div className={`${base} h-3 w-40 mb-6`} />

          {/* About Section */}
          <div className={`${base} h-4 w-20 mb-3`} />
          <div className="space-y-2 bg-gray-100 rounded-xl p-4">
            <div className={`${base} h-3 w-3/4`} />
            <div className={`${base} h-3 w-5/6`} />
            <div className={`${base} h-3 w-4/6`} />
          </div>
        </div>

        {/* Right Section - Pricing Card */}
        <div className="bg-[#EFEFEF] rounded-xl shadow p-6 space-y-4 h-fit">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className={`${base} h-4 w-20`} />
              <div className={`${base} h-4 w-12`} />
            </div>
          ))}

          <hr />

          {/* Total */}
          <div className="flex justify-between text-lg font-semibold">
            <div className={`${base} h-5 w-14`} />
            <div className={`${base} h-5 w-16`} />
          </div>

          {/* Button */}
          <div className={`${base} w-full h-10 rounded-lg`} />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ExperienceCard from "./ExperienceCard";
import ExperienceCardShimmer from "./ExperienceCardShimmer";

const ExperienceGrid = ({ search }) => {
  const { experiences } = useAppContext();
  const filteredExperiences = experiences?.filter((experience) =>
    experience.name.toLowerCase().includes(search.toLowerCase())
  );
  if (!experiences) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4  xl:px-20 px-10 ">
        {[...Array(10)].map((_, i) => (
          <ExperienceCardShimmer key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4  xl:px-20 px-10 ">
      {filteredExperiences?.map((experience, idx) => (
        <ExperienceCard key={experience?._id || idx} experience={experience} />
      ))}
    </div>
  );
};

export default ExperienceGrid;

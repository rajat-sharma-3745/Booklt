import React, { useEffect } from "react";
import ExperienceGrid from "../components/ExperienceGrid";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { search } = useOutletContext();
  const { setBookingDetails } = useAppContext();

  useEffect(() => {
    setBookingDetails({});
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <ExperienceGrid search={search} />
    </div>
  );
};

export default Home;

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Toaster } from "sonner";

const AppContext = createContext(null);
const AppProvider = ({ children }) => {
  const [experiences, setExperiences] = useState(null);
  const [filteredExperiences, setFilteredExperiences] = useState(null);

  const [bookingDetails, setBookingDetails] = useState({});
  const [search, setSearch] = useState("");

  async function getExperiences() {
    try {
      const { data } = await axiosInstance.get(API_PATHS.EXPERIENCE.GET);
      setExperiences(data);
      setFilteredExperiences(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearch = () => {
    const filtered = experiences?.filter((experience) =>
      experience.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredExperiences(filtered);
  };

  useEffect(() => {
    getExperiences();
  }, []);
  const value = {
    experiences,
    setBookingDetails,
    bookingDetails,
    filteredExperiences,
    setFilteredExperiences,
    handleSearch,
    setSearch,
    search,
  };
  return (
    <AppContext.Provider value={value}>
      <Toaster position="top-center" />
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppProvider;

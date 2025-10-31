import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Toaster } from "sonner";


const AppContext = createContext(null);
const AppProvider = ({ children }) => {
   const [experiences,setExperiences] = useState(null)
   const [bookingDetails,setBookingDetails] = useState({});
    async function getExperiences(){
        try {
            
            const {data} = await axiosInstance.get(API_PATHS.EXPERIENCE.GET)
            setExperiences(data)
        } catch (error) {
            console.log(error)
        }
    }
   
    useEffect(()=>{
        getExperiences()
    },[])
    const value = {experiences,setBookingDetails,bookingDetails}
  return <AppContext.Provider value={value}>
        <Toaster position="top-center" />
    {children}
  </AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
export default AppProvider
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({search,setSearch}) => {
  return (
  <nav className="flex items-center justify-between px-4 md:px-10 lg:px-24 xl:px-32 h-16 md:h-20 py-4 shadow-sm bg-[#f9f9f9]">

  <Link to={'/'}>
    <img 
      src={logo} 
      alt="logo" 
      className="w-16 h-12 sm:w-24 sm:h-12 md:w-28 md:h-14 object-contain"
    />
  </Link>

 
  <div className="flex items-center gap-2 md:gap-4 w-56 sm:w-full sm:max-w-[350px] md:max-w-[400px] lg:max-w-[444px]">
    <input
      className="w-full py-2 md:py-3.5 px-3 md:px-4 bg-[#ededed] rounded outline-none placeholder-[#727272] text-sm"
      type="text"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      placeholder="Search experiences"
    />
    <button className="px-3 md:px-5 py-2 md:py-3 bg-[#FFD643] rounded text-black  text-sm md:text-base">
      Search
    </button>
  </div>
</nav>

  );
};

export default Header;

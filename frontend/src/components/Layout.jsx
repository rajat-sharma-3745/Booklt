import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [search,setSearch] = useState('');

  return (
    <div className="bg-orange-50 min-h-screen">
      <Header search={search} setSearch={setSearch} />

      <Outlet context={{search}} />
    </div>
  );
};

export default Layout;

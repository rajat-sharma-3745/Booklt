import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Layout = () => {
  const { search, setSearch } = useAppContext();

  return (
    <div className="bg-orange-50 min-h-screen">
      <Header search={search} setSearch={setSearch} />

      <Outlet context={{ search }} />
    </div>
  );
};

export default Layout;

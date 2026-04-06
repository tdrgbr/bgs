import React, { useEffect, useRef, useState } from "react";
import LogoIcon from "./logo.svg?react";
import MonitorIcon from "./monitor.svg?react";
import HistoryIcon from "./history.svg?react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "./logout.svg?react";
const Sidebar = () => {
  const lastScroll = useRef(0);
  const [hideMobile, setHideMobile] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll.current) setHideMobile(true);
      else if (currentScroll < lastScroll.current) setHideMobile(false);

      lastScroll.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);
  return (
    <>
      <div className="bg-[#f7f7f7] h-lvh w-60 max-w-60 fixed left-0 top-0 border-r-[#dbdbdb] border-r max-lg:hidden">
        <div className="inline-flex gap-2 items-center justify-start  p-5">
          <LogoIcon className="h-9 w-9 text-[#5e5e5e]" />
          <h1 className="title text-3xl font-light text-[#5e5e5e]">
            BGS Security
          </h1>
        </div>

        <div className=" mb-10">
          <p className="text-xs">
            You're logged in as <b>Operator1</b>.
          </p>
        </div>

        <div className="flex-col mt-10 p-0 transition-all duration-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b border-[#dedede] h-15 flex items-center justify-start p-5 bg-gray-200 transition-all duration-500"
                : "border-b border-[#dedede] h-15 flex items-center justify-start p-5 transition-all duration-500"
            }
          >
            <div className="inline-flex gap-3">
              <MonitorIcon className="h-5 w-5" />
              <p className="text-sm">Live monitoring</p>
            </div>
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? "border-b border-[#dedede] h-15 flex items-center justify-start p-5 bg-gray-200 transition-all duration-500"
                : "border-b border-[#dedede] h-15 flex items-center justify-start p-5 transition-all duration-500"
            }
          >
            <div className="inline-flex gap-3">
              <HistoryIcon className="h-5 w-5" />
              <p className="text-sm">Alerts history</p>
            </div>
          </NavLink>
          <NavLink
            to="/"
            className="border-b border-[#dedede]  h-15 flex items-end justify-start p-5"
          >
            <div className="inline-flex gap-3">
              <LogoutIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">Logout</p>
            </div>
          </NavLink>
          <div className="mt-10 flex justify-center items-center text-xs">
            <p>BGS Security v0.03 @ 08/01/2026</p>
          </div>
        </div>
      </div>
      <div
        className={`min-lg:hidden bg-cards rounded-3xl fixed bottom-3 left-3 right-3 flex justify-around items-center px-5 py-3  font-other border-profile border-1 z-50 transition-all duration-300 ${
          hideMobile ? "translate-y-100" : "translate-y-0"
        }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center justify-center font-bold  space-y-2 transition duration-300 shadow-2xs shadow-blue-500"
              : "flex flex-col items-center justify-center font-normal text-secondary space-y-2 contrast-50 hover:text-gray/50 hover:contrast-200 transition duration-300"
          }
        >
          <MonitorIcon className="h-6 w-6" />
          <span className="text-[0.70rem]">Live monitoring</span>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center justify-center font-bold  space-y-2 transition duration-300 shadow-2xs shadow-blue-500"
              : "flex flex-col items-center justify-center font-normal text-secondary space-y-2 contrast-50 hover:text-gray/50 hover:contrast-200 transition duration-300"
          }
        >
          <HistoryIcon className="h-6 w-6" />
          <span className="text-[0.70rem]">Alerts history</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;

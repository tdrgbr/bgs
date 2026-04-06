import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { ClipLoader } from "react-spinners";
import MapIcon from "./map.svg?react";

const History = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: { total: 0, confirmed: 0, lastTime: "-" },
    logs: [],
    activeAlert: null,
    isOnline: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://infoap-production.up.railway.app/api/data")
        .then((res) => res.json())
        .then((payload) => {
          setData(payload);
          setLoading(false);
        })
        .catch(err);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <>
        <Sidebar />
        <div className="fixed inset-0 flex flex-col justify-center items-center z-50 lg:ml-40">
          <ClipLoader size={60} color="#000" />
          <p className="mt-4 font-medium animate-pulse tracking-wide text-black">
            Checking ESP32 System..
          </p>
        </div>
      </>
    );
  return (
    <>
      <Sidebar />
      <div className="flex justify-start lg:ml-60">
        <h1 className="text-m inline-flex items-center gap-3">
          <div
            className={`w-3 h-3 ${
              data.isOnline ? "bg-green-500" : "bg-red-500"
            } rounded-full animate-pulse`}
          ></div>
          <p>ESP board is {data.isOnline ? "connected" : "disconnected"}.</p>
        </h1>
      </div>

      {!data.isOnline && (
        <div className="mt-10 bg-red-500 flex justify-start lg:ml-60 w-auto rounded-2xl text-white text-left text-sm p-5 font-bold shadow-md">
          The ESP32 Board is not connected. You can't receive/manage any alerts.
        </div>
      )}
      <div className="lg:ml-60 flex justify-start mt-10">
        <h2 className="title text-3xl">Alert Logs</h2>
      </div>
      <div className="lg:ml-60 flex-col-reverse justfiy-start mt-10">
        {data?.logs.map((data, i) => (
          <div className="inline-flex border-b border-[#dbdbdb] w-full gap-10 h-20 justify-center items-center hover:bg-slate-50 transition-colors duration-200">
            <p>
              Location: <b>{data.location}</b>
            </p>
            <p>
              Date: <b>{data.date}</b>
            </p>
            <a
              href="https://www.google.com/maps?q=45.6443,25.5956"
              target="_blank"
              className="text-blue-400 flex items-center gap-3  "
            >
              <MapIcon className="h-8 w-8" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default History;

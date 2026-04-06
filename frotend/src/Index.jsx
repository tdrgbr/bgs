import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import { ClipLoader } from "react-spinners";
import MapIcon from "./map.svg?react";
import ClockIcon from "./time.svg?react";
import CoordIcon from "./coord.svg?react";
import ConfirmIcon from "./confirm.svg?react";
import AlertIcon from "./alert.svg?react";
import Swal from "sweetalert2";

function App() {
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

  const handleConfirm = () => {
    if (data.isOnline) {
      Swal.fire({
        title: "You are about to confirm an SOS call.",
        text: "Before proceeding, please verify the alert location and take all necessary steps to provide assistance.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1d6e1e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Send confirmation",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch("https://infoap-production.up.railway.app/api/confirm", {
            method: "POST",
          }).catch((err) => console.error(err));

          Swal.fire({
            title: "Confirmed!",
            text: "Confirmation signal sent to the ESP32 board. Please follow all necessary procedures to provide assistance. You can always review the location in the Alerts History tab.",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The board is disconnected.",
      });
    }
  };
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
        <h1 className="title text-3xl">Alert Information</h1>
      </div>

      {!data.activeAlert ? (
        <div className="mt-10 border border-[#dbdbdb] flex items-center justify-start lg:ml-60 rounded-2xl text-left text-sm p-5 font-bold h-20 hover:shadow-md transition-all duration-300 shadow-sm">
          <h1 className="text-left text-md">No active alerts at the moment.</h1>
        </div>
      ) : (
        <div className="mt-10 border border-[#dbdbdb] flex-col lg:ml-60 rounded-2xl  text-sm font-bold h-auto pb-5 shadow-sm hover:shadow-lg transition-all duration-300 ">
          <div className="flex border-b border-[#dbdbdb] h-15 p-2 rounded-t-xl justify-start items-center bg-red-500 shadow-md">
            <h1 className="text-md p-5 text-white title flex items-center space-x-3">
              <AlertIcon className="h-5 w-5" />
              <span className="text-white">Alert in progress</span>{" "}
            </h1>
          </div>
          <div className="flex flex-col space-y-3 p-5 ">
            <p className="flex items-center space-x-3">
              <MapIcon className="h-5 w-5 " />
              <span className="font-normal ">
                Alert location: <b>{data.activeAlert.location}</b>
              </span>
            </p>
            <p className="flex items-center space-x-3">
              <CoordIcon className="h-5 w-5 " />
              <span className="font-normal ">
                Coordinates: <b> 45.6443° N, 25.5956° E</b>
              </span>
            </p>
            <p className="flex items-center space-x-3">
              <ClockIcon className="h-5 w-5 text-black" />
              <span className="font-normal">
                Requested at: <b>{data.activeAlert.time}</b>
              </span>
            </p>
            <br />
            <a
              href="https://www.google.com/maps?q=45.6443,25.5956"
              target="_blank"
              className="bg-blue-600  h-10 rounded-xl cursor-pointer text-center p-2 hover:shadow-xl hover:scale-[1.01] hover:bg-blue-500 transition-all duration-300 text-white flex justify-center items-center gap-2"
            >
              <MapIcon className="h-4 w-4" />
              <span>View on map</span>
            </a>
            <button
              onClick={handleConfirm}
              className={`bg-green-600 h-10 rounded-xl hover:shadow-xl hover:scale-[1.01] hover:bg-green-500  transition-all duration-300 text-white flex justify-center items-center gap-2 cursor-pointer ${
                !data.isOnline && "bg-red-300 hover:bg-red-300"
              } `}
            >
              <ConfirmIcon className="h-4 w-4" />
              <p>Confirm - Send help</p>
            </button>
          </div>
        </div>
      )}

      <div className="lg:ml-60 flex justify-start mt-10">
        <h1 className="title text-3xl">Statistics</h1>
      </div>
      <div className="flex lg:space-x-4 lg:ml-60 space-x-3 mt-10">
        <div className="border border-[#dbdbdb] flex items-center justify-center rounded-2xl p-5 font-bold h-40 w-40 hover:bg-black/60 hover:text-white transition-all duration-300 shadow-sm hover:shadow-2xl">
          <div className="flex-col space-y-3 text-center">
            <h1 className="text-3xl max-lg:text-xl">{data.stats.total}</h1>
            <p className="text-xs max-lg:text-[0.6em]">Total alerts</p>
          </div>
        </div>
        <div className="border border-[#dbdbdb] flex items-center justify-center rounded-2xl p-5 font-bold h-40 w-40 hover:bg-black/60 hover:text-white transition-all duration-300 shadow-sm hover:shadow-2xl">
          <div className="flex-col space-y-3 text-center">
            <h1 className="text-3xl max-lg:text-xl">{data.stats.confirmed}</h1>
            <p className="text-xs max-lg:text-[0.6em]">Confirmed alerts</p>
          </div>
        </div>
        <div className="border border-[#dbdbdb] flex items-center justify-center rounded-2xl p-5 font-bold h-40 w-40 hover:bg-black/60 hover:text-white transition-all duration-300 shadow-sm  hover:shadow-2xl">
          <div className="flex-col space-y-3 text-center">
            <h1 className="text-3xl max-lg:text-xl">{data.stats.lastTime}</h1>
            <p className="text-xs max-lg:text-[0.6em]">Last alert time</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

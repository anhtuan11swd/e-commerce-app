import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="mx-auto my-8 ml-[max(5vw,25px)] w-[70%] text-gray-600 text-base">
              <Routes>
                <Route element={<Navigate replace to="/admin" />} path="/" />
                <Route element={<Add token={token} />} path="/admin/add" />
                <Route element={<List token={token} />} path="/admin/list" />
                <Route
                  element={<Orders token={token} />}
                  path="/admin/orders"
                />
                <Route element={<Add token={token} />} path="/admin" />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

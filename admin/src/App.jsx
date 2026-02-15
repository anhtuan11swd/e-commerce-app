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
    <div className="bg-gray-50/50 min-h-screen">
      <ToastContainer autoClose={500} position="top-right" theme="colored" />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar setToken={setToken} />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 ml-64 p-6 lg:p-8">
              <div className="mx-auto max-w-6xl">
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
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

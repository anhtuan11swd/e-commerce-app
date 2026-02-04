import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../config.js";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("admin@forever.com");
  const [password, setPassword] = useState("forever123");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Đăng nhập thành công");
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="bg-white shadow-md px-8 py-6 rounded-lg max-w-md">
          <h1 className="mb-4 font-bold text-2xl">Bảng Điều Khiển Quản Trị</h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3 min-w-72">
              <p className="mb-2 font-medium text-gray-700 text-sm">
                Địa Chỉ Email
              </p>
              <input
                className="px-3 py-2 border border-gray-300 rounded-md outline-none w-full"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@cua-ban.com"
                required
                type="email"
                value={email}
              />
            </div>
            <div className="mb-3 min-w-72">
              <p className="mb-2 font-medium text-gray-700 text-sm">Mật Khẩu</p>
              <input
                className="px-3 py-2 border border-gray-300 rounded-md outline-none w-full"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                required
                type="password"
                value={password}
              />
            </div>
            <button
              className="bg-black mt-2 px-4 py-2 rounded-md w-full text-white"
              type="submit"
            >
              Đăng Nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

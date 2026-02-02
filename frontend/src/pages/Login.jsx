import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  // State quản lý trạng thái form (Login/Sign Up) và dữ liệu nhập
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Lấy dữ liệu từ ShopContext
  const { backendUrl, setToken } = useContext(ShopContext);

  // Xử lý submit form đăng nhập/đăng ký
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        // Gọi API đăng ký
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          email,
          name,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Đăng ký thành công!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Gọi API đăng nhập
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Đăng nhập thành công!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra!");
    }
  };

  return (
    // Form đăng nhập/đăng ký với responsive design
    <form
      className="flex flex-col items-center gap-4 m-auto mt-14 w-[90%] sm:max-w-96 text-gray-800"
      onSubmit={onSubmitHandler}
    >
      {/* Tiêu đề form */}
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">
          {currentState === "Sign Up" ? "Đăng ký" : "Đăng nhập"}
        </p>
        <hr className="bg-gray-800 border-none w-8 h-[1.5px]" />
      </div>

      {/* Input họ tên chỉ hiển thị khi đăng ký */}
      {currentState === "Sign Up" && (
        <input
          className="px-3 py-2 border border-gray-800 w-full"
          onChange={(e) => setName(e.target.value)}
          placeholder="Họ tên"
          required
          type="text"
          value={name}
        />
      )}

      {/* Input email */}
      <input
        className="px-3 py-2 border border-gray-800 w-full"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        type="email"
        value={email}
      />

      {/* Input mật khẩu */}
      <input
        className="px-3 py-2 border border-gray-800 w-full"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        required
        type="password"
        value={password}
      />

      {/* Phần chuyển đổi trạng thái form và quên mật khẩu */}
      <div className="flex justify-between mt-[-8px] w-full text-sm">
        <p className="cursor-pointer">Quên mật khẩu?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setCurrentState("Sign Up");
              }
            }}
          >
            Tạo tài khoản
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setCurrentState("Login");
              }
            }}
          >
            Đăng nhập tại đây
          </p>
        )}
      </div>

      {/* Button submit form */}
      <button
        className="bg-black mt-4 px-8 py-2 font-light text-white"
        type="submit"
      >
        {currentState === "Login" ? "Đăng nhập" : "Đăng ký"}
      </button>
    </form>
  );
};

// Export component Login
export default Login;

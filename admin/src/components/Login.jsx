import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../config.js";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("admin@forever.com");
  const [password, setPassword] = useState("forever123");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 min-h-screen">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="-top-40 -right-40 absolute bg-purple-500/20 blur-3xl rounded-full w-80 h-80"></div>
        <div className="-bottom-40 -left-40 absolute bg-blue-500/20 blur-3xl rounded-full w-80 h-80"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <div className="inline-flex justify-center items-center bg-white/10 backdrop-blur-lg mb-4 border border-white/20 rounded-2xl w-16 h-16">
            <svg
              aria-label="Khóa bảo mật"
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Khóa bảo mật</title>
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h1 className="font-bold text-white text-2xl">
            Bảng Điều Khiển Quản Trị
          </h1>
          <p className="mt-2 text-white/60 text-sm">
            Đăng nhập để tiếp tục quản lý
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 shadow-2xl backdrop-blur-xl p-8 border border-white/20 rounded-2xl">
          <form className="space-y-5" onSubmit={onSubmitHandler}>
            <div>
              <label
                className="block mb-2 font-medium text-white/80 text-sm"
                htmlFor="email"
              >
                Địa Chỉ Email
              </label>
              <input
                className="bg-white/5 px-4 py-3 border border-white/10 focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-white transition-all duration-200 placeholder-white/40"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@cua-ban.com"
                required
                type="email"
                value={email}
              />
            </div>
            <div>
              <label
                className="block mb-2 font-medium text-white/80 text-sm"
                htmlFor="password"
              >
                Mật Khẩu
              </label>
              <input
                className="bg-white/5 px-4 py-3 border border-white/10 focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-white transition-all duration-200 placeholder-white/40"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                required
                type="password"
                value={password}
              />
            </div>
            <button
              className="flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 hover:from-purple-700 to-blue-600 hover:to-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl w-full font-semibold text-white disabled:transform-none hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed transform"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <svg
                    aria-label="Đang tải"
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <title>Đang tải</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      fill="none"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-white/40 text-sm text-center">
          © 2026. Tất cả các quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
};

export default Login;

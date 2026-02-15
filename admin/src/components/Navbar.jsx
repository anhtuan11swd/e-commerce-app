import { assets } from "../assets/admin_assets/assets.js";

const Navbar = ({ setToken }) => {
  return (
    <div className="top-0 z-50 sticky bg-white/80 shadow-sm backdrop-blur-lg border-gray-200/50 border-b">
      <div className="flex justify-between items-center px-6 py-3">
        <img alt="Logo cửa hàng" className="w-auto h-10" src={assets.logo} />
        <button
          aria-label="Đăng xuất khỏi hệ thống"
          className="group flex items-center gap-2 bg-gradient-to-r from-gray-100 hover:from-red-50 to-gray-200 hover:to-red-100 px-5 py-2.5 border border-gray-200 hover:border-red-200 rounded-xl font-medium text-gray-700 hover:text-red-600 text-sm transition-all duration-200"
          onClick={() => setToken("")}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Đăng Xuất
        </button>
      </div>
    </div>
  );
};

export default Navbar;

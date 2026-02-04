import { assets } from "../assets/admin_assets/assets.js";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex justify-between items-center px-[4%] py-2">
      <img alt="" className="w-[max(10%,80px)]" src={assets.logo} />
      <button
        className="bg-gray-600 px-5 sm:px-7 py-2 sm:py-2 rounded-full text-white text-xs sm:text-sm"
        onClick={() => setToken("")}
        type="button"
      >
        Đăng Xuất
      </button>
    </div>
  );
};

export default Navbar;

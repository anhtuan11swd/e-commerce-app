import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

// Component helper cho NavLink với hiệu ứng active
// NavLinkWithActive: Component hỗ trợ hiển thị trạng thái active cho các liên kết điều hướng
const NavLinkWithActive = ({ to, children }) => (
  <NavLink
    className={({ isActive }) =>
      `flex flex-col items-center gap-1 ${
        isActive ? "text-black" : "text-gray-700"
      }`
    }
    to={to}
  >
    {({ isActive }) => (
      <>
        <p>{children}</p>
        {/* Đường kẻ dưới (underline) chỉ hiển thị khi link đang active */}
        <hr
          className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${
            isActive ? "block" : "hidden"
          }`}
        />
      </>
    )}
  </NavLink>
);

// Component Navbar - Thanh điều hướng chính của ứng dụng
// Bao gồm logo, menu điều hướng, và các icon chức năng (tìm kiếm, hồ sơ, giỏ hàng)
// Hỗ trợ responsive design với menu mobile dạng sidebar
const Navbar = () => {
  // State để kiểm soát hiển thị menu mobile
  const [visible, setVisible] = useState(false);

  // Lấy dữ liệu từ ShopContext
  const { getCartCount, navigate, setToken, setCartItems } =
    useContext(ShopContext);

  // Hàm đăng xuất
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex justify-between items-center py-5 font-medium">
      {/* Logo - Biểu tượng thương hiệu */}
      <Link to="/">
        <img alt="Logo thương hiệu" className="w-36" src={assets.logo} />
      </Link>

      {/* Menu Desktop - Menu dành cho màn hình lớn */}
      <ul className="hidden sm:flex gap-5 text-gray-700 text-sm">
        <NavLinkWithActive to="/">TRANG CHỦ</NavLinkWithActive>
        <NavLinkWithActive to="/collection">BỘ SƯU TẬP</NavLinkWithActive>
        <NavLinkWithActive to="/about">GIỚI THIỆU</NavLinkWithActive>
        <NavLinkWithActive to="/contact">LIÊN HỆ</NavLinkWithActive>
      </ul>

      {/* Icons bên phải - Các biểu tượng bên phải */}
      <div className="flex items-center gap-6">
        {/* Icon tìm kiếm - Biểu tượng tìm kiếm */}
        <img
          alt="Tìm kiếm"
          className="w-5 cursor-pointer"
          src={assets.searchIcon}
        />

        {/* Dropdown hồ sơ - Menu xổ xuống hồ sơ */}
        <div className="group relative">
          <img
            alt="Hồ sơ"
            className="w-5 cursor-pointer"
            src={assets.profileIcon}
          />
          <div className="hidden group-hover:block right-0 absolute pt-4 dropdown-menu">
            <div className="flex flex-col gap-2 bg-slate-100 px-5 py-3 rounded w-36 text-gray-500">
              <p className="hover:text-black cursor-pointer">Hồ sơ của tôi</p>
              <Link className="hover:text-black cursor-pointer" to="/orders">
                Đơn hàng
              </Link>
              <p
                className="hover:text-black cursor-pointer"
                onClick={logout}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    logout();
                  }
                }}
              >
                Đăng xuất
              </p>
            </div>
          </div>
        </div>

        {/* Icon giỏ hàng - Biểu tượng giỏ hàng */}
        <Link className="relative" to="/cart">
          <img alt="Giỏ hàng" className="w-5 min-w-5" src={assets.cartIcon} />
          <p className="right-[-5px] bottom-[-5px] absolute bg-black rounded-full w-4 aspect-square text-[8px] text-white text-center leading-4">
            {getCartCount()}
          </p>
        </Link>

        {/* Icon menu mobile - Biểu tượng menu cho thiết bị di động */}
        <button
          aria-label="Mở menu"
          className="sm:hidden"
          onClick={() => setVisible(true)}
          type="button"
        >
          <img
            alt="Menu"
            className="w-5 cursor-pointer"
            src={assets.menuIcon}
          />
        </button>
      </div>

      {/* Menu thanh bên mobile - Menu dạng thanh bên cho thiết bị di động */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <button
            aria-label="Đóng menu"
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
            type="button"
          >
            <img
              alt="Quay lại"
              className="h-4 rotate-180"
              src={assets.dropdownIcon}
            />
            <p>Quay lại</p>
          </button>
          <NavLink
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? "text-black bg-gray-100" : ""}`
            }
            onClick={() => setVisible(false)}
            to="/"
          >
            TRANG CHỦ
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? "text-black bg-gray-100" : ""}`
            }
            onClick={() => setVisible(false)}
            to="/collection"
          >
            BỘ SƯU TẬP
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? "text-black bg-gray-100" : ""}`
            }
            onClick={() => setVisible(false)}
            to="/about"
          >
            GIỚI THIỆU
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? "text-black bg-gray-100" : ""}`
            }
            onClick={() => setVisible(false)}
            to="/contact"
          >
            LIÊN HỆ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

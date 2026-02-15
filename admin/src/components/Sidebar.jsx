import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets.js";

const Sidebar = () => {
  const navItems = [
    { icon: assets.add_icon, label: "Thêm Sản Phẩm", to: "/admin/add" },
    { icon: assets.order_icon, label: "Danh Sách Sản Phẩm", to: "/admin/list" },
    { icon: assets.parcel_icon, label: "Đơn Hàng", to: "/admin/orders" },
  ];

  return (
    <aside className="top-[57px] bottom-0 left-0 z-40 fixed bg-white border-gray-100 border-r w-64">
      <nav className="flex flex-col gap-1 p-4 pt-6">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
            key={item.to}
            to={item.to}
          >
            {({ isActive }) => (
              <>
                <img
                  alt=""
                  className={`w-5 h-5 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}
                  src={item.icon}
                />
                <span
                  className={`font-medium text-sm ${isActive ? "text-white" : ""} hidden md:block`}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer info */}
      <div className="right-0 bottom-0 left-0 absolute p-4 border-gray-100 border-t">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="flex justify-center items-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg w-8 h-8">
            <span className="font-bold text-white text-xs">A</span>
          </div>
          <div className="hidden lg:block">
            <p className="font-medium text-gray-700 text-sm">Admin Panel</p>
            <p className="text-gray-400 text-xs">v1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

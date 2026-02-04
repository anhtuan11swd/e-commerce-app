import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets.js";

const Sidebar = () => {
  return (
    <div className="border-r-2 w-[18%] min-h-screen">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {/* pl-[20%] để tránh bị che bởi border-r-2 */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
              isActive ? "bg-gray-100" : ""
            }`
          } // border-r-0 để tránh chồng lên border của sidebar
          to="/admin/add"
        >
          <img alt="" className="w-5 h-5" src={assets.add_icon} />
          <p className="hidden md:block">Thêm Sản Phẩm</p>{" "}
          {/* Ẩn trên mobile để tiết kiệm không gian */}
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
              isActive ? "bg-gray-100" : ""
            }`
          } // border-r-0 để tránh chồng lên border của sidebar
          to="/admin/list"
        >
          <img alt="" className="w-5 h-5" src={assets.order_icon} />
          <p className="hidden md:block">Danh Sách Sản Phẩm</p>{" "}
          {/* Ẩn trên mobile để tiết kiệm không gian */}
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
              isActive ? "bg-gray-100" : ""
            }`
          } // border-r-0 để tránh chồng lên border của sidebar
          to="/admin/orders"
        >
          <img alt="" className="w-5 h-5" src={assets.parcel_icon} />
          <p className="hidden md:block">Đơn Hàng</p>{" "}
          {/* Ẩn trên mobile để tiết kiệm không gian */}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

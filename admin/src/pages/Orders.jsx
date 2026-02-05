import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
import { backendUrl } from "../config";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  }).format(value);
};

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [token]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        toast.success("Cập nhật trạng thái đơn hàng thành công");
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/list`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.data.success) {
          setOrders(response.data.orders.reverse());
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h3>Trang Đơn Hàng</h3>
      <div>
        {orders.map((order) => (
          <div
            className="items-start gap-3 grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] my-3 md:my-4 p-5 md:p-8 border-2 border-gray-200 text-gray-700 text-xs sm:text-sm"
            key={order._id}
          >
            <img
              alt=""
              className="w-12"
              src={order.items[0]?.image?.[0] || assets.parcel_icon}
            />
            <div>
              <div>
                {order.items.map((item, itemIndex) => (
                  <p className="py-0.5" key={`${order._id}-${itemIndex}`}>
                    {item.name} x {item.quantity} <span> {item.size} </span>
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div>
                <p>{`${order.address.street},`}</p>
                <p>
                  {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                </p>
              </div>
            </div>
            <div>
              <p className="sm:text-[15px] text-sm">
                Sản phẩm : {order.items.length}
              </p>
              <p className="mt-3">Phương thức : {order.paymentMethod}</p>
              <p>
                Thanh toán : {order.payment ? "Hoàn thành" : "Chưa thanh toán"}
              </p>
              <p>Ngày : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="sm:text-[15px] text-sm">
              {formatCurrency(order.amount)}
            </p>
            <select
              className="p-2 font-semibold"
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Đã đặt hàng">Đã đặt hàng</option>
              <option value="Đang đóng gói">Đang đóng gói</option>
              <option value="Đã giao hàng">Đã giao hàng</option>
              <option value="Đang vận chuyển">Đang vận chuyển</option>
              <option value="Đã giao thành công">Đã giao thành công</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

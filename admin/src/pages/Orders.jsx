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

const statusColors = {
  "Đang vận chuyển": {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  "Đang đóng gói": {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
  },
  "Đã giao hàng": {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
  },
  "Đã giao thành công": {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
  },
  "Đã đặt hàng": {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
};

const statusOptions = [
  "Đã đặt hàng",
  "Đang đóng gói",
  "Đang vận chuyển",
  "Đã giao hàng",
  "Đã giao thành công",
];

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(null);

  const fetchAllOrders = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const statusHandler = async (event, orderId) => {
    setUpdateLoading(orderId);
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
    } finally {
      setUpdateLoading(null);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-bold text-gray-800 text-2xl">Quản Lý Đơn Hàng</h2>
        <p className="mt-1 text-gray-500">
          Theo dõi và cập nhật trạng thái đơn hàng
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-3">
            <svg
              aria-label="Đang tải"
              className="w-8 h-8 text-purple-600 animate-spin"
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
            <p className="text-gray-500 text-sm">Đang tải đơn hàng...</p>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col justify-center items-center bg-white py-20 border border-gray-100 rounded-2xl">
          <div className="flex justify-center items-center bg-gray-100 mb-4 rounded-full w-16 h-16">
            <svg
              aria-label="Không có đơn hàng"
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Không có đơn hàng</title>
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <p className="text-gray-500">Chưa có đơn hàng nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusStyle =
              statusColors[order.status] || statusColors["Đã đặt hàng"];
            return (
              <div
                className="bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-shadow duration-200"
                key={order._id}
              >
                <div className="gap-4 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto_auto] p-5 lg:p-6">
                  {/* Product Image */}
                  <div className="flex items-start">
                    <img
                      alt=""
                      className="shadow-sm rounded-xl w-16 h-16 object-cover"
                      src={order.items[0]?.image?.[0] || assets.parcel_icon}
                    />
                  </div>

                  {/* Order Details */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}
                      >
                        {order.status}
                      </span>
                      {order.payment && (
                        <span className="bg-green-50 px-3 py-1 border border-green-200 rounded-full font-semibold text-green-700 text-xs">
                          ✓ Đã thanh toán
                        </span>
                      )}
                    </div>
                    <div>
                      {order.items.map((item, itemIndex) => (
                        <p
                          className="text-gray-700 text-sm"
                          key={`${order._id}-${itemIndex}`}
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500">
                            {" "}
                            x {item.quantity}
                          </span>
                          <span className="text-gray-400">
                            {" "}
                            (Size: {item.size})
                          </span>
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      <span className="font-medium text-gray-700">
                        {order.address.firstName} {order.address.lastName}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-500 text-sm">
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 mt-0.5 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      <span>
                        {order.address.street}, {order.address.city},{" "}
                        {order.address.state}, {order.address.country}
                      </span>
                    </div>
                  </div>

                  {/* Order Meta */}
                  <div className="flex flex-col items-end gap-2 text-sm">
                    <p className="font-bold text-gray-800 text-lg">
                      {formatCurrency(order.amount)}
                    </p>
                    <div className="text-gray-500 text-right">
                      <p>{order.items.length} sản phẩm</p>
                      <p className="text-xs">{order.paymentMethod}</p>
                      <p className="text-xs">
                        {new Date(order.date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>

                  {/* Status Select */}
                  <div className="flex items-center">
                    <select
                      className={`px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 bg-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 cursor-pointer ${updateLoading === order._id ? "opacity-50" : ""}`}
                      disabled={updateLoading === order._id}
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {!isLoading && orders.length > 0 && (
        <div className="flex justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50 mt-6 p-4 border border-purple-100 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-purple-100 rounded-xl w-10 h-10">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Tổng đơn hàng</p>
              <p className="text-gray-500 text-sm">{orders.length} đơn hàng</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Tổng doanh thu</p>
            <p className="font-bold text-purple-600 text-xl">
              {formatCurrency(
                orders.reduce((sum, order) => sum + order.amount, 0),
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { backendUrl, token } = useContext(ShopContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      style: "currency",
    }).format(price);
  };

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        if (!token) return;

        const response = await axios.post(
          `${backendUrl}/api/order/userorders`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (response.data.success) {
          const allOrdersItem = [];
          response.data.orders.forEach((order) => {
            order.items.forEach((item) => {
              item.status = order.status;
              item.payment = order.payment;
              item.paymentMethod = order.paymentMethod;
              item.date = order.date;
              allOrdersItem.push(item);
            });
          });
          setOrderData(allOrdersItem.reverse());
        }
      } catch (error) {
        toast.error(error.message || "Không thể tải đơn hàng");
      }
    };

    loadOrderData();
  }, [token, backendUrl]);

  return (
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <div className="inline-flex items-center gap-2 mb-3">
          <p className="text-gray-500">
            ĐƠN HÀNG <span className="font-medium text-gray-700">CỦA TÔI</span>
          </p>
          <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-[2px]"></p>
        </div>
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 py-4 border-t border-b text-gray-700"
            key={`${item._id}-${item.size}-${item.quantity}-${index}`}
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                alt=""
                className="w-16 sm:w-20"
                src={item.image?.[0] || null}
              />
              <div>
                <p className="font-medium sm:text-base">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-gray-700 text-base">
                  <p>{formatPrice(item.price)}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Kích thước: {item.size}</p>
                </div>
                <p className="mt-1">
                  Ngày:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toLocaleDateString("vi-VN")}
                  </span>
                </p>
                <p className="mt-1">
                  Thanh toán:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between md:w-1/2">
              <div className="flex items-center gap-2">
                <p className="bg-green-500 rounded-full min-w-2 h-2"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                className="px-4 py-2 border rounded-sm font-medium text-sm"
                type="button"
              >
                Theo dõi đơn hàng
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

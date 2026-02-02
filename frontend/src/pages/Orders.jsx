import { useEffect, useState } from "react";

const Orders = () => {
  // Định dạng giá tiền theo chuẩn Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      style: "currency",
    }).format(price);
  };

  // State lưu trữ dữ liệu đơn hàng từ localStorage
  const [orderData, setOrderData] = useState(() => {
    // Khởi tạo với đơn hàng đã lưu hoặc mảng trống
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      // Đảm bảo tất cả đơn hàng có mảng ảnh hợp lệ
      return parsedOrders.map((order) => ({
        ...order,
        images:
          Array.isArray(order.images) && order.images.length > 0
            ? order.images
            : [""],
      }));
    } else {
      return [];
    }
  });

  // Làm mới đơn hàng khi component mount (trường hợp đơn hàng được cập nhật từ PlaceOrder)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        // Ensure all orders have valid image arrays
        const safeOrders = parsedOrders.map((order) => ({
          ...order,
          images:
            Array.isArray(order.images) && order.images.length > 0
              ? order.images
              : [""],
        }));
        setOrderData(safeOrders);
      }
    };

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Also check immediately in case orders were updated in the same tab
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Render danh sách đơn hàng
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
                src={item.images?.[0] || null}
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

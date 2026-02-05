import { useContext, useMemo } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

/**
 * Component Cart - Trang giỏ hàng
 *
 * Thuật ngữ thương mại điện tử:
 * - Tạm tính (Subtotal): Tổng giá trị các sản phẩm trước khi cộng phí giao hàng
 * - Phí giao hàng (Shipping Fee): Chi phí vận chuyển
 * - Tổng cộng (Total): Tổng tiền cần thanh toán bao gồm tất cả
 */

const Cart = () => {
  const { cartItems, products, deliveryFee, updateQuantity, navigate } =
    useContext(ShopContext);
  const cartData = useMemo(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            quantity: cartItems[items][item],
            size: item,
          });
        }
      }
    }
    return tempData;
  }, [cartItems]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      style: "currency",
    }).format(price);
  };

  // Xử lý thay đổi số lượng sản phẩm, tự động xóa khi quantity <= 0
  // Dọn dẹp cấu trúc nested object khi không còn size nào
  const handleQuantityChange = (itemId, size, newQuantity) => {
    if (newQuantity <= 0) {
      const updatedCartItems = { ...cartItems };
      delete updatedCartItems[itemId][size];
      if (Object.keys(updatedCartItems[itemId]).length === 0) {
        delete updatedCartItems[itemId];
      }
      updateQuantity(itemId, size, 0);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
    } else {
      updateQuantity(itemId, size, newQuantity);
      toast.success("Đã cập nhật số lượng sản phẩm!");
    }
  };

  const handleRemoveItem = (itemId, size) => {
    updateQuantity(itemId, size, 0);
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const getSubtotal = () => {
    return cartData.reduce((total, item) => {
      const product = products.find((p) => p._id === item._id);
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };

  const getTotal = () => {
    return getSubtotal() + deliveryFee;
  };

  return (
    <div className="pt-14 border-t">
      <div className="mb-3 text-2xl">
        <div className="inline-flex items-center gap-2 mb-3">
          <p className="text-gray-500">
            GIỎ HÀNG <span className="font-medium text-gray-700">CỦA BẠN</span>
          </p>
          <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-[2px]"></p>
        </div>
      </div>

      <div>
        {cartData.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-lg">Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          cartData.map((item, index) => {
            const product = products.find((p) => p._id === item._id);
            if (!product) return null;

            return (
              <div
                className="items-center gap-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] py-4 border-t border-b text-gray-700"
                key={`${item._id}-${item.size}-${index}`}
              >
                <div className="flex items-start gap-6">
                  <img
                    alt={product.name}
                    className="w-16 sm:w-20"
                    src={product.image?.[0] || product.images?.[0]}
                  />
                  <div>
                    <p className="font-medium text-xs sm:text-lg">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{formatPrice(product.price)}</p>
                      <p className="bg-slate-50 px-2 sm:px-3 sm:py-1 border">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  className="px-1 sm:px-2 py-1 border max-w-10 sm:max-w-20"
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(
                      item._id,
                      item.size,
                      parseInt(e.target.value, 10) || 0,
                    )
                  }
                  type="number"
                  value={item.quantity}
                />
                <img
                  alt="Xóa sản phẩm"
                  className="mr-4 w-4 sm:w-5 cursor-pointer"
                  onClick={() => handleRemoveItem(item._id, item.size)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRemoveItem(item._id, item.size);
                    }
                  }}
                  src={assets.binIcon}
                />
              </div>
            );
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <div className="w-full">
              <div className="text-2xl">
                <div className="inline-flex items-center gap-2 mb-3">
                  <p className="text-gray-500">
                    TỔNG{" "}
                    <span className="font-medium text-gray-700">GIỎ HÀNG</span>
                  </p>
                  <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-[2px]"></p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                  <p>Tạm tính</p>
                  <p>{formatPrice(getSubtotal())}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <p>Phí giao hàng</p>
                  <p>{formatPrice(deliveryFee)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <b>Tổng cộng</b>
                  <b>{formatPrice(getTotal())}</b>
                </div>
              </div>
            </div>
            <div className="w-full text-end">
              <button
                className="bg-black hover:bg-gray-800 my-8 px-8 py-3 text-white text-sm transition-colors"
                onClick={() => navigate("/place-order")}
                type="button"
              >
                TIẾN HÀNH THANH TOÁN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

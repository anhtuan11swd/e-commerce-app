import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { products as mockProducts } from "../assets/frontend_assets/assets";

/**
 * ShopContext - Context quản lý trạng thái toàn cục của cửa hàng e-commerce
 */
const ShopContext = createContext();

/**
 * ShopContextProvider - Provider cung cấp các chức năng quản lý giỏ hàng, tìm kiếm, tiền tệ
 */
export default function ShopContextProvider({ children }) {
  const [products] = useState(mockProducts);
  const [currency] = useState("$");
  const [deliveryFee] = useState(10000);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  /**
   * addToCart - Thêm sản phẩm vào giỏ hàng
   * @param {string} itemId - ID sản phẩm
   * @param {string} size - Kích thước sản phẩm
   */
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Vui lòng chọn kích thước sản phẩm");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: { token } },
      );
    }
  };

  /**
   * getCartCount - Lấy tổng số lượng sản phẩm trong giỏ
   * @returns {number} Tổng số lượng
   */
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  /**
   * updateQuantity - Cập nhật số lượng sản phẩm
   * @param {string} itemId - ID sản phẩm
   * @param {string} size - Kích thước
   * @param {number} quantity - Số lượng mới
   */
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (cartData[itemId]?.[size]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      if (token) {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, quantity, size },
          { headers: { token } },
        );
      }
    }
  };

  /**
   * getCartAmount - Tính tổng tiền giỏ hàng
   * @returns {number} Tổng tiền
   */
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            totalAmount += product.price * quantity;
          }
        }
      }
    }
    return totalAmount;
  };

  const value = {
    addToCart,
    cartItems,
    currency,
    deliveryFee,
    getCartAmount,
    getCartCount,
    navigate,
    products,
    search,
    setCartItems,
    setSearch,
    setShowSearch,
    showSearch,
    updateQuantity,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export { ShopContext };

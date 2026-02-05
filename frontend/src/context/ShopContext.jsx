import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * ShopContext - Context quản lý trạng thái toàn cục của cửa hàng e-commerce
 */
const ShopContext = createContext();

/**
 * ShopContextProvider - Provider cung cấp các chức năng quản lý giỏ hàng, tìm kiếm, tiền tệ
 */
export default function ShopContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [currency] = useState("$");
  const [deliveryFee] = useState(10000);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [productsLoading, setProductsLoading] = useState(true);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  /**
   * getProductsData - Lấy danh sách sản phẩm từ API backend
   */
  const getProductsData = useCallback(async () => {
    try {
      setProductsLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.log("Không thể lấy dữ liệu sản phẩm từ API");
        setProducts([]);
      }
    } catch (error) {
      console.log("Lỗi khi kết nối với backend:", error.message);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch products khi component mount
  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

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

    // Cập nhật local cart
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
    toast.success("Đã thêm sản phẩm vào giỏ hàng!");

    // Đồng bộ với database nếu có token
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (error) {
        toast.error(error.message || "Không thể đồng bộ với server");
      }
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
        try {
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId, quantity, size },
            { headers: { Authorization: `Bearer ${token}` } },
          );
        } catch (error) {
          toast.error(error.message || "Không thể cập nhật số lượng");
        }
      }
    }
  };

  /**
   * getUserCart - Lấy dữ liệu giỏ hàng của user từ database
   * @param {string} token - Token xác thực
   */
  const getUserCart = useCallback(async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      toast.error(error.message || "Không thể tải giỏ hàng");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load user cart khi có token (login/reload)
  useEffect(() => {
    if (token && localStorage.getItem("token")) {
      getUserCart(localStorage.getItem("token"));
    }
  }, [token, getUserCart]);

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
    backendUrl,
    cartItems,
    currency,
    deliveryFee,
    getCartAmount,
    getCartCount,
    getUserCart,
    navigate,
    products,
    productsLoading,
    search,
    setCartItems,
    setSearch,
    setShowSearch,
    setToken,
    showSearch,
    token,
    updateQuantity,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export { ShopContext };

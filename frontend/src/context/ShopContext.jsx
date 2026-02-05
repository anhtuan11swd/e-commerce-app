import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShopContext = createContext();
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

  const getProductsData = useCallback(async () => {
    try {
      setProductsLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch {
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  // Xử lý logic thêm sản phẩm vào giỏ hàng với đồng bộ hai chiều
  // Cấu trúc cartItems: { productId: { size: quantity } }
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
    toast.success("Đã thêm sản phẩm vào giỏ hàng!");

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

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  // Duyệt qua cấu trúc nested object { productId: { size: quantity } }
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

  // Cập nhật số lượng sản phẩm trong giỏ hàng với đồng bộ server
  // Xử lý việc xóa sản phẩm khi quantity = 0
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

  // Tự động tải giỏ hàng từ server khi user đăng nhập
  useEffect(() => {
    if (token && localStorage.getItem("token")) {
      getUserCart(localStorage.getItem("token"));
    }
  }, [token, getUserCart]);

  // Tính tổng tiền giỏ hàng dựa trên cấu trúc nested object
  // Duyệt qua { productId: { size: quantity } } để tính tổng giá trị
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

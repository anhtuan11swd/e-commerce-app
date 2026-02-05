import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const {
    navigate,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
    backendUrl,
    token,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    city: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    state: "",
    street: "",
    zipcode: "",
  });

  const [method, setMethod] = useState("cod");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Giỏ hàng trống!");
        return;
      }

      const orderData = {
        address: formData,
        amount: getCartAmount() + deliveryFee,
        items: orderItems,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          if (response.data.success) {
            setCartItems({});
            toast.success("Đặt hàng thành công!");
            navigate("/orders");
          } else {
            toast.error(response.data.message || "Đặt hàng thất bại");
          }
          break;
        }

        default:
          toast.error("Phương thức thanh toán không được hỗ trợ");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Có lỗi xảy ra khi đặt hàng");
    }
  };

  return (
    <form
      className="flex sm:flex-row flex-col justify-between gap-4 pt-5 sm:pt-14 border-t min-h-[80vh]"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <p className="text-gray-500">
              THÔNG TIN{" "}
              <span className="font-medium text-gray-700">GIAO HÀNG</span>
            </p>
            <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-[2px]"></p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            name="firstName"
            onChange={onChangeHandler}
            placeholder="Tên"
            required
            type="text"
            value={formData.firstName}
          />
          <input
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            name="lastName"
            onChange={onChangeHandler}
            placeholder="Họ"
            required
            type="text"
            value={formData.lastName}
          />
        </div>

        <input
          className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
          name="email"
          onChange={onChangeHandler}
          placeholder="Địa chỉ email"
          required
          type="email"
          value={formData.email}
        />

        <input
          className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
          name="street"
          onChange={onChangeHandler}
          placeholder="Đường phố"
          required
          type="text"
          value={formData.street}
        />

        <div className="flex gap-3">
          <input
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            name="city"
            onChange={onChangeHandler}
            placeholder="Thành phố"
            required
            type="text"
            value={formData.city}
          />
          <input
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            name="state"
            onChange={onChangeHandler}
            placeholder="Tỉnh"
            type="text"
            value={formData.state}
          />
        </div>

        <div className="flex gap-3">
          <input
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            name="zipcode"
            onChange={onChangeHandler}
            placeholder="Mã bưu điện"
            required
            type="text"
            value={formData.zipcode}
          />
          <input
            className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
            name="country"
            onChange={onChangeHandler}
            placeholder="Việt Nam"
            required
            type="text"
            value={formData.country}
          />
        </div>

        <input
          className="px-3.5 py-1.5 border border-gray-300 rounded w-full"
          name="phone"
          onChange={onChangeHandler}
          placeholder="Số điện thoại"
          required
          type="text"
          value={formData.phone}
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
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
                <p>$ {(getCartAmount() / 100).toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Phí giao hàng</p>
                <p>$ {(deliveryFee / 100).toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <b>Tổng cộng</b>
                <b>$ {((getCartAmount() + deliveryFee) / 100).toFixed(2)}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <p className="text-gray-500">
              PHƯƠNG THỨC{" "}
              <span className="font-medium text-gray-700">THANH TOÁN</span>
            </p>
            <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-[2px]"></p>
          </div>

          <div className="flex lg:flex-row flex-col gap-3">
            <button
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
              onClick={() => setMethod("stripe")}
              type="button"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img alt="Stripe" className="mx-4 h-5" src={assets.stripeLogo} />
            </button>

            <button
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
              onClick={() => setMethod("razorpay")}
              type="button"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                alt="Razorpay"
                className="mx-4 h-5"
                src={assets.razorpayLogo}
              />
            </button>

            <button
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
              onClick={() => setMethod("cod")}
              type="button"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="mx-4 font-medium text-gray-500 text-sm">
                THANH TOÁN KHI NHẬN HÀNG
              </p>
            </button>
          </div>

          <div className="mt-8 w-full text-end">
            <button
              className="bg-black px-16 py-3 text-white text-sm"
              type="submit"
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

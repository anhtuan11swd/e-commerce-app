import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  // Lấy ID sản phẩm từ URL params
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  // State lưu thông tin sản phẩm hiện tại
  const [productData, setProductData] = useState(null);
  // State lưu ảnh đang được chọn
  const [image, setImage] = useState("");
  // State lưu size được chọn
  const [size, setSize] = useState("");
  // State lưu tab đang active (mô tả/đánh giá)
  const [activeTab, setActiveTab] = useState("description");

  // useEffect để tải dữ liệu sản phẩm khi component mount hoặc productId thay đổi
  useEffect(() => {
    const fetchProductData = async () => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.images[0]);
      }
    };

    fetchProductData();
  }, [productId, products]);

  // Xử lý thêm sản phẩm vào giỏ hàng
  const addToCartHandler = () => {
    addToCart(productData._id, size);
  };

  // Định dạng giá tiền theo chuẩn Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      style: "currency",
    }).format(price);
  };

  if (!productData) {
    return <div className="py-10 text-center">Đang tải...</div>;
  }

  // Lọc sản phẩm liên quan (cùng category nhưng khác ID, lấy tối đa 5 sản phẩm)
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === productData.category && item._id !== productData._id,
    )
    .slice(0, 5);

  // Render trang chi tiết sản phẩm
  return (
    <div className="opacity-100 pt-10 border-t-2 transition-opacity duration-500 ease-in">
      <div className="flex sm:flex-row flex-col gap-12 sm:gap-12">
        {/* Gallery ảnh */}
        <div className="flex sm:flex-row flex-col-reverse flex-1 gap-3">
          <div className="flex sm:flex-col justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.images.map((img, index) => (
              <button
                className="bg-transparent sm:mb-3 p-0 border border-gray-200 w-[24%] sm:w-full cursor-pointer shrink-0"
                key={`thumbnail-${productData._id}-${index}`}
                onClick={() => setImage(img)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setImage(img);
                  }
                }}
                type="button"
              >
                <img alt={`Ảnh ${index + 1}`} className="w-full" src={img} />
              </button>
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img alt={productData.name} className="w-full h-auto" src={image} />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1">
          <h1 className="mt-2 font-medium text-2xl">{productData.name}</h1>

          {/* Đánh giá sao */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img
                alt=""
                className="w-3 5"
                key={`star-main-${productData._id}-${i}`}
                src={i < 4 ? assets.starIcon : assets.starDullIcon}
              />
            ))}
            <p className="pl-2">(122)</p>
          </div>

          {/* Giá */}
          <p className="mt-5 font-medium text-3xl">
            {formatPrice(productData.price)}
          </p>

          {/* Mô tả */}
          <p className="mt-5 md:w-4/5 text-gray-500">
            {productData.description}
          </p>

          {/* Chọn size */}
          <div className="flex flex-col gap-4 my-8">
            <p>Chọn Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((s, index) => (
                <button
                  className={`border py-2 px-4 bg-gray-100 hover:bg-gray-200 ${
                    size === s ? "border-orange-500 bg-orange-50" : ""
                  }`}
                  key={`size-${productData._id}-${s}-${index}`}
                  onClick={() => setSize(s)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSize(s);
                    }
                  }}
                  type="button"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Nút thêm vào giỏ */}
          <button
            className="bg-black hover:bg-gray-800 active:bg-gray-700 px-8 py-3 text-white text-sm transition-colors"
            onClick={addToCartHandler}
            type="button"
          >
            THÊM VÀO GIỎ
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* Thông tin bổ sung */}
          <div className="flex flex-col gap-1 mt-5 text-gray-500 text-sm">
            <p>100% Sản phẩm chính hãng.</p>
            <p>Thanh toán khi nhận hàng có sẵn.</p>
            <p>Chính sách đổi trả dễ dàng trong 7 ngày.</p>
          </div>
        </div>
      </div>

      {/* Tab Description/Reviews */}
      <div className="mt-20">
        <div className="flex">
          <button
            aria-pressed={activeTab === "description"}
            className={`border px-5 py-3 text-sm cursor-pointer ${
              activeTab === "description"
                ? "bg-gray-100 border-gray-300"
                : "border-gray-200"
            }`}
            onClick={() => setActiveTab("description")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveTab("description");
              }
            }}
            type="button"
          >
            Mô tả
          </button>
          <button
            aria-pressed={activeTab === "reviews"}
            className={`border px-5 py-3 text-sm cursor-pointer ${
              activeTab === "reviews"
                ? "bg-gray-100 border-gray-300"
                : "border-gray-200"
            }`}
            onClick={() => setActiveTab("reviews")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveTab("reviews");
              }
            }}
            type="button"
          >
            Đánh giá (122)
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-6 border text-gray-500 text-sm">
          {activeTab === "description" ? (
            <>
              <p>
                Website thương mại điện tử là một nền tảng trực tuyến tạo điều
                kiện mua bán sản phẩm hoặc dịch vụ qua internet. Nó phục vụ như
                một chợ ảo nơi doanh nghiệp và cá nhân có thể giới thiệu sản
                phẩm, tương tác với khách hàng và thực hiện giao dịch mà không
                cần sự hiện diện vật lý. Các website thương mại điện tử đã trở
                nên phổ biến nhờ sự tiện lợi, khả năng tiếp cận và phạm vi toàn
                cầu mà chúng cung cấp.
              </p>
              <p>
                Các website thương mại điện tử thường hiển thị sản phẩm hoặc
                dịch vụ kèm theo mô tả chi tiết, hình ảnh, giá cả và các biến
                thể có sẵn (ví dụ: kích thước, màu sắc). Mỗi sản phẩm thường có
                trang riêng với thông tin liên quan.
              </p>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img
                      alt=""
                      className="w-4 h-4"
                      key={`star-review-1-${productData._id}-${i}`}
                      src={i < 4 ? assets.starIcon : assets.starDullIcon}
                    />
                  ))}
                </div>
                <p className="text-sm">Rất tốt! Sản phẩm chất lượng cao.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img
                      alt=""
                      className="w-4 h-4"
                      key={`star-review-2-${productData._id}-${i}`}
                      src={i < 5 ? assets.starIcon : assets.starDullIcon}
                    />
                  ))}
                </div>
                <p className="text-sm">Hoàn hảo! Giao hàng nhanh.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div className="my-24">
        <div className="py-2 text-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <p className="text-gray-500">
              SẢN PHẨM{" "}
              <span className="font-medium text-gray-700">LIÊN QUAN</span>
            </p>
            <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-[2px]"></p>
          </div>
        </div>
        <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {relatedProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

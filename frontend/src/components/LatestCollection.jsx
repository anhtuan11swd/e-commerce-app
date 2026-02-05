import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products, productsLoading } = useContext(ShopContext);

  // Sắp xếp sản phẩm theo thời gian tạo (mới nhất trước) và lấy 10 sản phẩm đầu
  const latestProducts = useMemo(() => {
    return [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);
  }, [products]);

  return (
    <div className="my-10">
      <Title
        description="Khám phá bộ sưu tập sản phẩm mới nhất với chất lượng vượt trội và thiết kế hiện đại. Những sản phẩm được cập nhật liên tục để đáp ứng nhu cầu của bạn."
        text1="BỘ SƯU TẬP"
        text2="MỚI NHẤT"
      />

      <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {productsLoading ? (
          [
            "sk1",
            "sk2",
            "sk3",
            "sk4",
            "sk5",
            "sk6",
            "sk7",
            "sk8",
            "sk9",
            "sk10",
          ].map((key) => (
            <div className="animate-pulse" key={key}>
              <div className="bg-gray-200 mb-3 rounded-lg aspect-square"></div>
              <div className="bg-gray-200 mb-2 rounded h-4"></div>
              <div className="bg-gray-200 rounded w-2/3 h-4"></div>
            </div>
          ))
        ) : latestProducts.length > 0 ? (
          latestProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full py-10 text-gray-500 text-center">
            Đang tải sản phẩm...
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;

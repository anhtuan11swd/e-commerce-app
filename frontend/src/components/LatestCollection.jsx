import { useContext, useEffect, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  // Lấy 10 sản phẩm mới nhất dựa trên thời gian tạo
  const latestProducts = useMemo(() => {
    return [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);
  }, [products]);

  // Logic lọc products - sẽ được trigger khi products thay đổi
  useEffect(() => {
    // logic lọc products
  }, []);

  return (
    <div className="my-10">
      <Title
        description="Khám phá bộ sưu tập sản phẩm mới nhất với chất lượng vượt trội và thiết kế hiện đại. Những sản phẩm được cập nhật liên tục để đáp ứng nhu cầu của bạn."
        text1="BỘ SƯU TẬP"
        text2="MỚI NHẤT"
      />

      {/* Lưới sản phẩm */}
      <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;

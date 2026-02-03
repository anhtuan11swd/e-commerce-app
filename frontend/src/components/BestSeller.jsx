import { useContext, useEffect, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  // Lọc sản phẩm bán chạy nhất (bestseller: true) và lấy 5 sản phẩm đầu tiên
  const bestSellerProducts = useMemo(() => {
    return products
      .filter((product) => product.bestseller === true)
      .slice(0, 5);
  }, [products]);

  // Logic lọc products - sẽ được trigger khi products thay đổi
  useEffect(() => {
    // logic lọc products
  }, []);

  return (
    <div className="my-10">
      <Title
        description="Khám phá bộ sưu tập các sản phẩm bán chạy nhất với chất lượng vượt trội và thiết kế thời trang. Những sản phẩm được yêu thích nhất bởi khách hàng."
        text1="SẢN PHẨM"
        text2="BÁN CHẠY NHẤT"
      />

      {/* Lưới sản phẩm */}
      <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSellerProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

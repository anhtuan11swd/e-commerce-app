import { products } from "../assets/frontend_assets/assets";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {
  // Lọc sản phẩm bán chạy nhất (bestseller: true) và lấy 5 sản phẩm đầu tiên
  const bestSellerProducts = products
    .filter((product) => product.bestseller === true)
    .slice(0, 5);

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

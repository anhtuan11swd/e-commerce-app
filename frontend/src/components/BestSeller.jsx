import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {
  const { products, productsLoading } = useContext(ShopContext);

  const bestSellerProducts = useMemo(() => {
    return products
      .filter((product) => product.bestseller === true)
      .slice(0, 5);
  }, [products]);

  return (
    <div className="my-10">
      <Title
        description="Khám phá bộ sưu tập các sản phẩm bán chạy nhất với chất lượng vượt trội và thiết kế thời trang. Những sản phẩm được yêu thích nhất bởi khách hàng."
        text1="SẢN PHẨM"
        text2="BÁN CHẠY NHẤT"
      />

      <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {productsLoading ? (
          ["sk1", "sk2", "sk3", "sk4", "sk5"].map((key) => (
            <div className="animate-pulse" key={key}>
              <div className="bg-gray-200 mb-3 rounded-lg aspect-square"></div>
              <div className="bg-gray-200 mb-2 rounded h-4"></div>
              <div className="bg-gray-200 rounded w-2/3 h-4"></div>
            </div>
          ))
        ) : bestSellerProducts.length > 0 ? (
          bestSellerProducts.map((product) => (
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

export default BestSeller;

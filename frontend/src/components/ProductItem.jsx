import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      style: "currency",
    }).format(price);
  };

  return (
    <Link
      className="block text-gray-700 cursor-pointer"
      to={`/product/${product._id}`}
    >
      <div className="overflow-hidden">
        <img
          alt={product.name}
          className="w-full h-auto hover:scale-110 transition ease-in-out"
          src={product.image?.[0] || product.images?.[0]} // Fallback để tương thích với cấu trúc dữ liệu cũ/mới
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{product.name}</p>
      <p className="font-medium text-sm">{formatPrice(product.price)}</p>
    </Link>
  );
};

export default ProductItem;

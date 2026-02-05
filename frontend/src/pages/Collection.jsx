import { useContext, useMemo, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";

/**
 * Component trang bộ sưu tập sản phẩm với bộ lọc và sắp xếp
 * Hiển thị danh sách sản phẩm với khả năng lọc theo danh mục, loại và tìm kiếm
 */
const Collection = () => {
  const { products, productsLoading, search, showSearch } =
    useContext(ShopContext);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showFilters, setShowFilters] = useState(false);

  const availableCategories = productsLoading
    ? []
    : [...new Set(products.map((p) => p.category))];
  const availableSubCategories = productsLoading
    ? []
    : [...new Set(products.map((p) => p.subCategory))];

  const handleCategoryChange = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  };

  const handleSubCategoryChange = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((sc) => sc !== value)
        : [...prev, value],
    );
  };

  /**
   * Logic lọc và sắp xếp sản phẩm chính
   * Tối ưu hóa với useMemo để tránh tính toán lại không cần thiết
   */
  const filterProducts = useMemo(() => {
    let productsCopy = products.slice();

    // Filter theo search
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter theo category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    // Filter theo subCategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    // Sort products
    switch (sortType) {
      case "low-high":
        productsCopy = productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy = productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        // Liên quan - giữ nguyên thứ tự
        break;
    }

    return productsCopy;
  }, [category, subCategory, search, showSearch, sortType, products]);

  return (
    <div className="flex sm:flex-row flex-col gap-1 sm:gap-10 pt-10 border-t">
      {/* Thanh bộ lọc bên */}
      <div className="min-w-60">
        <button
          className="flex items-center gap-2 my-2 text-xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
          type="button"
        >
          BỘ LỌC
          <img
            alt=""
            className={`h-3 sm:hidden transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
            src={assets.dropdownIcon}
          />
        </button>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilters ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 font-medium text-sm">DANH MỤC</p>
          <div className="flex flex-col gap-2 font-light text-gray-700 text-sm">
            {availableCategories.map((cat) => (
              <p className="flex gap-2" key={cat}>
                <input
                  checked={category.includes(cat)}
                  className="w-3"
                  onChange={() => handleCategoryChange(cat)}
                  type="checkbox"
                  value={cat}
                />
                {cat}
              </p>
            ))}
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilters ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 font-medium text-sm">LOẠI SẢN PHẨM</p>
          <div className="flex flex-col gap-2 font-light text-gray-700 text-sm">
            {availableSubCategories.map((subCat) => (
              <p className="flex gap-2" key={subCat}>
                <input
                  checked={subCategory.includes(subCat)}
                  className="w-3"
                  onChange={() => handleSubCategoryChange(subCat)}
                  type="checkbox"
                  value={subCat}
                />
                {subCat}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <p className="text-gray-500">
              TẤT CẢ{" "}
              <span className="font-medium text-gray-700">BỘ SƯU TẬP</span>
            </p>
            <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-[2px]"></p>
          </div>
          <select
            className="px-2 border-2 border-gray-300 text-sm"
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
          >
            <option value="relevant">Sắp xếp: Liên quan</option>
            <option value="low-high">Sắp xếp: Giá thấp đến cao</option>
            <option value="high-low">Sắp xếp: Giá cao đến thấp</option>
          </select>
        </div>

        <div className="gap-4 gap-y-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsLoading ? (
            ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"].map(
              (key) => (
                <div className="animate-pulse" key={key}>
                  <div className="bg-gray-200 mb-3 rounded-lg aspect-square"></div>
                  <div className="bg-gray-200 mb-2 rounded h-4"></div>
                  <div className="bg-gray-200 rounded w-2/3 h-4"></div>
                </div>
              ),
            )
          ) : filterProducts.length > 0 ? (
            filterProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <p className="col-span-full py-10 text-gray-500 text-center">
              {products.length === 0
                ? "Đang tải dữ liệu sản phẩm..."
                : "Không tìm thấy sản phẩm nào"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;

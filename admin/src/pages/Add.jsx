import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../config";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Nam");
  const [subCategory, setSubCategory] = useState("Áo");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", parseInt(price, 10) || 0);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // Thêm các hình ảnh đã chọn vào form data
      [image1, image2, image3, image4].forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle kích thước: thêm nếu chưa có, xóa nếu đã có
  const handleSizeChange = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  // Format số thành tiền tệ Việt Nam với dấu chấm ngăn cách
  const formatCurrency = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      style: "currency",
    }).format(numericValue);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^\d]/g, "");
    setPrice(numericValue);
  };

  const ImageUpload = ({ image, setImage, id, label }) => (
    <label className="group cursor-pointer" htmlFor={id}>
      <div className="relative bg-gray-50 group-hover:bg-purple-50 border-2 border-gray-300 group-hover:border-purple-500 border-dashed rounded-xl w-24 h-24 overflow-hidden transition-colors duration-200">
        {image ? (
          <>
            <img
              alt={`${label} preview`}
              className="w-full h-full object-cover"
              src={URL.createObjectURL(image)}
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="font-medium text-white text-xs">Đổi ảnh</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <svg
              aria-label="Tải lên hình ảnh"
              className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Tải lên hình ảnh</title>
              <path
                d="M12 4v16m8-8H4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <span className="mt-1 text-[10px] text-gray-400">{label}</span>
          </div>
        )}
      </div>
      <input
        accept="image/*"
        hidden
        id={id}
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
      />
    </label>
  );

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h2 className="font-bold text-gray-800 text-2xl">Thêm Sản Phẩm Mới</h2>
        <p className="mt-1 text-gray-500">
          Điền thông tin chi tiết để thêm sản phẩm vào cửa hàng
        </p>
      </div>

      <form
        className="space-y-6 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl"
        onSubmit={onSubmitHandler}
      >
        {/* Image Upload Section */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <p className="mb-4 font-semibold text-gray-700 text-sm">
            Hình Ảnh Sản Phẩm
          </p>
          <div className="flex flex-wrap gap-3">
            <ImageUpload
              id="image1"
              image={image1}
              label="Ảnh 1"
              setImage={setImage1}
            />
            <ImageUpload
              id="image2"
              image={image2}
              label="Ảnh 2"
              setImage={setImage2}
            />
            <ImageUpload
              id="image3"
              image={image3}
              label="Ảnh 3"
              setImage={setImage3}
            />
            <ImageUpload
              id="image4"
              image={image4}
              label="Ảnh 4"
              setImage={setImage4}
            />
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label
            className="block mb-2 font-semibold text-gray-700 text-sm"
            htmlFor="productName"
          >
            Tên sản phẩm
          </label>
          <input
            className="px-4 py-3 border border-gray-200 focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full transition-all duration-200"
            id="productName"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên sản phẩm"
            required
            type="text"
            value={name}
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block mb-2 font-semibold text-gray-700 text-sm"
            htmlFor="description"
          >
            Mô tả sản phẩm
          </label>
          <textarea
            className="px-4 py-3 border border-gray-200 focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full min-h-[120px] transition-all duration-200 resize-y"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Viết mô tả chi tiết về sản phẩm..."
            required
            type="text"
            value={description}
          />
        </div>

        {/* Categories & Price Row */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          <div>
            <label
              className="block mb-2 font-semibold text-gray-700 text-sm"
              htmlFor="category"
            >
              Danh mục
            </label>
            <select
              className="bg-white px-4 py-3 border border-gray-200 focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full transition-all duration-200"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Trẻ em">Trẻ em</option>
            </select>
          </div>
          <div>
            <label
              className="block mb-2 font-semibold text-gray-700 text-sm"
              htmlFor="subCategory"
            >
              Danh mục phụ
            </label>
            <select
              className="bg-white px-4 py-3 border border-gray-200 focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full transition-all duration-200"
              id="subCategory"
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
            >
              <option value="Áo">Áo</option>
              <option value="Quần">Quần</option>
              <option value="Đồ mùa đông">Đồ mùa đông</option>
            </select>
          </div>
          <div>
            <label
              className="block mb-2 font-semibold text-gray-700 text-sm"
              htmlFor="price"
            >
              Giá (VND)
            </label>
            <div className="relative">
              <input
                className="px-4 py-3 border border-gray-200 focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full transition-all duration-200"
                id="price"
                onChange={handlePriceChange}
                placeholder="0"
                type="text"
                value={price ? formatCurrency(price) : ""}
              />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-3 font-semibold text-gray-700 text-sm">Kích thước</p>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  sizes.includes(size)
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                key={size}
                onClick={() => handleSizeChange(size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 p-4 border border-amber-100 rounded-xl">
          <input
            checked={bestseller}
            className="rounded focus:ring-purple-500 w-5 h-5 text-purple-600 cursor-pointer"
            id="bestseller"
            onChange={() => setBestseller(!bestseller)}
            type="checkbox"
          />
          <label
            className="font-medium text-gray-700 text-sm cursor-pointer"
            htmlFor="bestseller"
          >
            Đánh dấu là sản phẩm bán chạy
          </label>
        </div>

        {/* Submit Button */}
        <button
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 hover:from-purple-700 to-blue-600 hover:to-blue-700 disabled:opacity-50 shadow-lg shadow-purple-500/25 px-6 py-4 rounded-xl w-full font-semibold text-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:cursor-not-allowed transform"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <>
              <svg
                aria-label="Đang tải"
                className="w-5 h-5 animate-spin"
                viewBox="0 0 24 24"
              >
                <title>Đang tải</title>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  fill="none"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
              Đang thêm sản phẩm...
            </>
          ) : (
            <>
              <svg
                aria-label="Thêm sản phẩm"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Thêm sản phẩm</title>
                <path
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Thêm Sản Phẩm
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Add;

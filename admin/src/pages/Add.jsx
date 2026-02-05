import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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

  return (
    <form
      className="flex flex-col items-start gap-3 w-full"
      onSubmit={onSubmitHandler}
    >
      <div>
        <p className="mb-2">Tải lên hình ảnh</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              alt=""
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
            />
            <input
              hidden
              id="image1"
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
            />
          </label>
          <label htmlFor="image2">
            <img
              alt=""
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
            />
            <input
              hidden
              id="image2"
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
            />
          </label>
          <label htmlFor="image3">
            <img
              alt=""
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
            />
            <input
              hidden
              id="image3"
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
            />
          </label>
          <label htmlFor="image4">
            <img
              alt=""
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
            />
            <input
              hidden
              id="image4"
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Tên sản phẩm</p>
        <input
          className="px-3 py-2 w-full max-w-[500px]"
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tại đây"
          required
          type="text"
          value={name}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Mô tả sản phẩm</p>
        <textarea
          className="px-3 py-2 w-full max-w-[500px]"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Viết nội dung tại đây"
          required
          type="text"
          value={description}
        />
      </div>
      <div className="flex sm:flex-row flex-col gap-2 sm:gap-8 w-full">
        <div>
          <p className="mb-2">Danh mục sản phẩm</p>
          <select
            className="px-3 py-2 w-full"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Trẻ em">Trẻ em</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Danh mục phụ</p>
          <select
            className="px-3 py-2 w-full"
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
          >
            <option value="Áo">Áo</option>
            <option value="Quần">Quần</option>
            <option value="Đồ mùa đông">Đồ mùa đông</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Giá sản phẩm</p>
          <input
            className="px-3 py-2 w-full sm:w-[120px]"
            onChange={handlePriceChange}
            placeholder="0 VND"
            type="text"
            value={price ? formatCurrency(price) : ""}
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Kích thước sản phẩm</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              className={`px-3 py-1 cursor-pointer border-none ${
                sizes.includes(size)
                  ? "bg-slate-900 text-white"
                  : "bg-slate-200"
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
      <div className="flex gap-2 mt-2">
        <input
          checked={bestseller}
          id="bestseller"
          onChange={() => setBestseller(!bestseller)}
          type="checkbox"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Thêm vào danh sách bán chạy
        </label>
      </div>
      <button className="bg-black mt-4 py-3 w-28 text-white" type="submit">
        THÊM
      </button>
    </form>
  );
};

export default Add;

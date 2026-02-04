import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../config";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  }).format(value);
};

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    // Thêm xác nhận trước khi xóa
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này?",
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Cần load lại để cập nhật UI
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);
        if (response.data.success) {
          setList(response.data.products);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <p className="mb-2">Danh Sách Tất Cả Sản Phẩm</p>
      <div className="flex flex-col gap-2">
        <div className="hidden items-center md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 px-2 py-1 border text-sm">
          <b>Hình Ảnh</b>
          <b>Tên</b>
          <b>Danh Mục</b>
          <b>Giá</b>
          <b className="text-center">Hành Động</b>
        </div>

        {list.map((item) => (
          <div
            className="items-center gap-2 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] px-2 py-1 border text-sm"
            key={item._id}
          >
            <img alt="" className="w-12" src={item.image[0]} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{formatCurrency(item.price)}</p>
            <button
              aria-label={`Xóa ${item.name}`} // Cho screen reader hiểu chức năng
              className="bg-transparent border-none text-lg md:text-center text-right cursor-pointer"
              onClick={() => removeProduct(item._id)}
              type="button"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;

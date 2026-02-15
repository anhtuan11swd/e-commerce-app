import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này?",
    );
    if (!confirmDelete) return;

    setDeleteLoading(id);
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
        await fetchList();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-bold text-gray-800 text-2xl">Danh Sách Sản Phẩm</h2>
        <p className="mt-1 text-gray-500">
          Quản lý tất cả sản phẩm trong cửa hàng
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-3">
            <svg
              aria-label="Đang tải"
              className="w-8 h-8 text-purple-600 animate-spin"
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
            <p className="text-gray-500 text-sm">Đang tải dữ liệu...</p>
          </div>
        </div>
      ) : list.length === 0 ? (
        <div className="flex flex-col justify-center items-center bg-white py-20 border border-gray-100 rounded-2xl">
          <div className="flex justify-center items-center bg-gray-100 mb-4 rounded-full w-16 h-16">
            <svg
              aria-label="Không có sản phẩm"
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Không có sản phẩm</title>
              <path
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <p className="text-gray-500">Chưa có sản phẩm nào</p>
          <p className="mt-1 text-gray-400 text-sm">
            Thêm sản phẩm mới để bắt đầu
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-[80px_2fr_1fr_1fr_100px] bg-gray-50/80 border-gray-100 border-b font-semibold text-gray-600 text-sm">
            <div className="px-4 py-4">Hình Ảnh</div>
            <div className="px-4 py-4">Tên Sản Phẩm</div>
            <div className="px-4 py-4">Danh Mục</div>
            <div className="px-4 py-4">Giá</div>
            <div className="px-4 py-4 text-center">Hành Động</div>
          </div>

          {/* Product Rows */}
          <div className="divide-y divide-gray-50">
            {list.map((item) => (
              <div
                className="items-center gap-4 grid grid-cols-[80px_1fr] md:grid-cols-[80px_2fr_1fr_1fr_100px] hover:bg-gray-50/50 px-4 py-4 transition-colors duration-150"
                key={item._id}
              >
                <div className="relative">
                  <img
                    alt={`${item.name} thumbnail`}
                    className="shadow-sm rounded-xl w-16 h-16 object-cover"
                    src={item.image[0]}
                  />
                  {item.bestseller && (
                    <span className="-top-1 -right-1 absolute bg-amber-500 px-1.5 py-0.5 rounded-full font-bold text-[10px] text-white">
                      HOT
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="md:hidden mt-1 text-gray-500 text-sm line-clamp-1">
                    {item.category} • {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="hidden md:block">
                  <span className="inline-flex items-center bg-purple-50 px-3 py-1 rounded-full font-medium text-purple-700 text-xs">
                    {item.category}
                  </span>
                </div>
                <div className="hidden md:block">
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <div className="flex justify-center">
                  <button
                    aria-label={`Xóa ${item.name}`}
                    className="hover:bg-red-50 disabled:opacity-50 p-2.5 rounded-xl text-red-500 transition-colors duration-200"
                    disabled={deleteLoading === item._id}
                    onClick={() => removeProduct(item._id)}
                    title="Xóa sản phẩm"
                    type="button"
                  >
                    {deleteLoading === item._id ? (
                      <svg
                        aria-label="Đang xóa"
                        className="w-5 h-5 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <title>Đang xóa</title>
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
                    ) : (
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {!isLoading && list.length > 0 && (
        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <p>
            Tổng số:{" "}
            <span className="font-semibold text-gray-700">{list.length}</span>{" "}
            sản phẩm
          </p>
        </div>
      )}
    </div>
  );
};

export default List;

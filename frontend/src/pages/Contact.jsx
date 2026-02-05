import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="pt-10 border-t text-2xl text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <p className="text-gray-500">
            LIÊN HỆ{" "}
            <span className="font-medium text-gray-700">VỚI CHÚNG TÔI</span>
          </p>
          <p className="bg-gray-700 w-8 sm:w-12 h-[1px] sm:h-[2px]"></p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-center gap-10 my-10 mb-28">
        <img
          alt=""
          className="w-full md:max-w-[480px]"
          src={assets.contactImg}
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-gray-600 text-xl">
            Cửa Hàng Của Chúng Tôi
          </p>
          <p className="text-gray-500">
            12 Nguyễn Văn Bảo, phường 4 <br /> quận Gò Vấp, thành phố Hồ Chí
            Minh
          </p>
          <p className="text-gray-500">
            Điện thoại: 0848.995.246 <br /> Email: anhtuan11.swd@gmail.com
          </p>
          <p className="font-semibold text-gray-600 text-xl">
            Tuyển Dụng Tại Forever
          </p>
          <p className="text-gray-500">
            Tìm hiểu thêm về đội ngũ và vị trí việc làm của chúng tôi.
          </p>
          <button
            className="hover:bg-black px-8 py-4 border border-black hover:text-white text-sm transition-all duration-500"
            type="button"
          >
            Khám Phá Việc Làm
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="font-medium text-gray-800 text-2xl">
          Đăng ký ngay và nhận giảm giá 20%
        </p>
        <p className="mt-3 text-gray-400">
          Đây là văn bản mẫu của ngành in ấn và sắp chữ.
        </p>
        <form className="flex items-center gap-3 mx-auto my-6 pl-3 border w-full sm:w-1/2">
          <input
            className="sm:flex-1 outline-none w-full"
            placeholder="Nhập email của bạn"
            required
            type="email"
          />
          <button
            className="bg-black px-10 py-4 text-white text-xs"
            type="submit"
          >
            ĐĂNG KÝ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

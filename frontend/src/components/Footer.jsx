import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col gap-14 sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-40 text-sm">
        <div>
          <img alt="" className="mb-5 w-32" src={assets.logo} />
          <p className="w-full md:w-2/3 text-gray-600">
            Forever là nền tảng thương mại điện tử hàng đầu, cung cấp các sản
            phẩm chất lượng cao với trải nghiệm mua sắm thuận tiện. Chúng tôi
            cam kết mang đến cho khách hàng những sản phẩm tốt nhất với dịch vụ
            chăm sóc khách hàng chuyên nghiệp.
          </p>
        </div>
        <div>
          <p className="mb-5 font-medium text-xl">CÔNG TY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Trang chủ</li>
            <li>Về chúng tôi</li>
            <li>Giao hàng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        <div>
          <p className="mb-5 font-medium text-xl">LIÊN HỆ</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>0848.995.246</li>
            <li>anhtuan11.swd@gmail.com</li>
            <li className="cursor-pointer">Instagram</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Bản quyền 2026@ Trần Anh Tuấn - Tất cả quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
};

export default Footer;

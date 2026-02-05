import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex sm:flex-row flex-col justify-around gap-12 sm:gap-2 py-20 text-gray-700 text-xs sm:text-sm md:text-base text-center">
      <div>
        <img
          alt="Biểu tượng đổi trả"
          className="m-auto mb-5 w-12"
          src={assets.exchangeIcon}
        />
        <p className="font-semibold">Chính sách đổi trả dễ dàng</p>
        <p className="text-gray-400">
          Chúng tôi cung cấp chính sách đổi trả không rắc rối
        </p>
      </div>

      <div>
        <img
          alt="Biểu tượng chất lượng"
          className="m-auto mb-5 w-12"
          src={assets.qualityIcon}
        />
        <p className="font-semibold">Chính sách trả hàng 7 ngày</p>
        <p className="text-gray-400">
          Chúng tôi cung cấp chính sách trả hàng miễn phí trong 7 ngày
        </p>
      </div>

      <div>
        <img
          alt="Biểu tượng hỗ trợ"
          className="m-auto mb-5 w-12"
          src={assets.supportImg}
        />
        <p className="font-semibold">Hỗ trợ khách hàng tốt nhất</p>
        <p className="text-gray-400">
          chúng tôi cung cấp dịch vụ hỗ trợ khách hàng 24/7
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;

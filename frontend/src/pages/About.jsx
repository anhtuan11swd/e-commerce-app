import { assets } from "../assets/frontend_assets/assets.js";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="pt-8 border-t text-2xl text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <p className="text-gray-500">
            VỀ <span className="font-medium text-gray-700">CHÚNG TÔI</span>
          </p>
          <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-0.5"></p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-16 my-10">
        <img
          alt="Về Forever"
          className="w-full md:max-w-[450px]"
          src={assets.aboutImg}
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever ra đời từ niềm đam mê đổi mới và mong muốn cách mạng hóa
            cách mọi người mua sắm trực tuyến. Hành trình của chúng tôi bắt đầu
            với một ý tưởng đơn giản: cung cấp một nền tảng nơi khách hàng có
            thể dễ dàng khám phá, tìm hiểu và mua hàng từ sự thoải mái của ngôi
            nhà mình.
          </p>
          <p>
            Từ khi thành lập, chúng tôi đã không ngừng nỗ lực để tuyển chọn một
            bộ sưu tập đa dạng các sản phẩm chất lượng cao phù hợp với mọi sở
            thích và nhu cầu. Từ thời trang và làm đẹp đến điện tử và đồ gia
            dụng thiết yếu, chúng tôi cung cấp bộ sưu tập rộng lớn từ các thương
            hiệu và nhà cung cấp uy tín.
          </p>
          <b className="text-gray-800">Sứ mệnh của chúng tôi</b>
          <p>
            Sứ mệnh của chúng tôi tại Forever là trao quyền cho khách hàng với
            lựa chọn, tiện lợi và sự tự tin. Chúng tôi cam kết cung cấp trải
            nghiệm mua sắm liền mạch vượt quá mong đợi, từ việc duyệt và đặt
            hàng đến giao hàng và hơn thế nữa.
          </p>
        </div>
      </div>

      <div className="py-4 text-xl">
        <div className="inline-flex items-center gap-2 mb-3">
          <p className="text-gray-500">
            TẠI SAO{" "}
            <span className="font-medium text-gray-700">CHỌN CHÚNG TÔI</span>
          </p>
          <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-0.5"></p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col mb-20 text-sm">
        <div className="flex flex-col gap-5 px-10 md:px-16 py-8 sm:py-20 border">
          <b>Đảm bảo chất lượng:</b>
          <p className="text-gray-600">
            Chúng tôi kỹ lưỡng lựa chọn và kiểm tra từng sản phẩm để đảm bảo
            chúng đáp ứng các tiêu chuẩn chất lượng nghiêm ngặt của chúng tôi.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 md:px-16 py-8 sm:py-20 border">
          <b>Tiện lợi:</b>
          <p className="text-gray-600">
            Với giao diện thân thiện với người dùng và quy trình đặt hàng không
            rắc rối, mua sắm chưa bao giờ dễ dàng đến thế.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 md:px-16 py-8 sm:py-20 border">
          <b>Dịch vụ khách hàng xuất sắc:</b>
          <p className="text-gray-600">
            Đội ngũ chuyên nghiệp tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn
            mọi lúc, đảm bảo sự hài lòng của bạn là ưu tiên hàng đầu.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;

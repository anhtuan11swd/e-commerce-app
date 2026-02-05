const NewsletterBox = () => {
  return (
    <div className="text-center">
      <p className="font-medium text-gray-800 text-2xl">
        Đăng ký ngay & nhận giảm giá 20%
      </p>
      <p className="mt-3 text-gray-400">
        Lorem Ipsum chỉ là văn bản giả của ngành in ấn và sắp chữ.
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
  );
};

export default NewsletterBox;

const Title = ({ text1, text2, description }) => {
  return (
    <div className="py-8 text-3xl text-center">
      <div className="inline-flex items-center gap-2 mb-3">
        <p className="text-gray-500">
          {text1} <span className="font-medium text-gray-700">{text2}</span>
        </p>
        <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-[2px]"></p>
      </div>
      {description && (
        <p className="m-auto w-3/4 text-gray-600 text-xs sm:text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default Title;

function SkeletonProductCard() {
  return (
    <div className="bg-white rounded-xl shadow animate-pulse">

      <div className="h-72 bg-gray-200 rounded-t-xl" />

      <div className="p-5">

        <div className="h-5 bg-gray-200 rounded mb-4" />

        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />

        <div className="h-6 bg-gray-300 rounded w-1/3" />

      </div>

    </div>
  );
}

export default SkeletonProductCard;
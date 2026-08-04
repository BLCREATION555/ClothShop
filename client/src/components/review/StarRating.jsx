import { FaStar } from "react-icons/fa";

function StarRating({
  rating = 0,
  editable = false,
  onChange,
  size = 22,
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!editable}
          onClick={() =>
            editable && onChange(star)
          }
          className={`transition-transform ${
            editable
              ? "hover:scale-125 cursor-pointer"
              : "cursor-default"
          }`}
        >
          <FaStar
            size={size}
            className={
              star <= rating
                ? "text-yellow-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
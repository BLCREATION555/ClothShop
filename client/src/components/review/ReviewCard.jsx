import { FaEdit, FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";

function ReviewCard({
  review,
  currentUserId,
  onEdit,
  onDelete,
}) {
  const isOwner =
    currentUserId === review.user.id;

  return (
    <div className="bg-white rounded-xl shadow p-5 border">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="font-bold text-lg">
            {review.user.name}
          </h3>

          <p className="text-sm text-gray-500">
            {new Date(
              review.createdAt
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

        </div>

        <StarRating rating={review.rating} />

      </div>

      <p className="mt-4 text-gray-700 leading-7">
        {review.comment}
      </p>

      {isOwner && (
        <div className="flex gap-3 mt-5">

          <button
            onClick={() => onEdit(review)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => onDelete(review.id)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <FaTrash />
            Delete
          </button>

        </div>
      )}

    </div>
  );
}

export default ReviewCard;
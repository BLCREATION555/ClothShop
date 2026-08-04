import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StarRating from "./StarRating";

function ReviewForm({
  initialReview = null,
  onSubmit,
  loading,
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (initialReview) {
      setRating(initialReview.rating);
      setComment(initialReview.comment);
    } else {
      setRating(5);
      setComment("");
    }
  }, [initialReview]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write your review.");
      return;
    }

    onSubmit({
      rating,
      comment,
    });

    if (!initialReview) {
      setRating(5);
      setComment("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6"
    >
      <h2 className="text-2xl font-bold mb-5">
        {initialReview
          ? "Edit Review"
          : "Write a Review"}
      </h2>

      <div className="mb-5">
        <StarRating
          rating={rating}
          editable
          onChange={setRating}
          size={30}
        />
      </div>

      <textarea
        rows="5"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Share your experience with this product..."
        className="w-full border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-60"
      >
        {loading
          ? "Saving..."
          : initialReview
          ? "Update Review"
          : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;
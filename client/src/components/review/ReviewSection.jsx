import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../../services/review.service";

import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";

function ReviewSection({
  productId,
  currentUserId,
}) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] =
    useState(0);
  const [totalReviews, setTotalReviews] =
    useState(0);

  const [editingReview, setEditingReview] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await getProductReviews(productId);

      setAverageRating(
        res.data.averageRating || 0
      );

      setTotalReviews(
        res.data.totalReviews || 0
      );

      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async ({
    rating,
    comment,
  }) => {
    try {
      setSaving(true);

      if (editingReview) {
        await updateReview(editingReview.id, {
          rating,
          comment,
        });

        toast.success(
          "Review updated successfully."
        );
      } else {
        await addReview({
          productId,
          rating,
          comment,
        });

        toast.success(
          "Review added successfully."
        );
      }

      setEditingReview(null);

      fetchReviews();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (
      !window.confirm(
        "Delete this review?"
      )
    )
      return;

    try {
      await deleteReview(reviewId);

      toast.success(
        "Review deleted successfully."
      );

      fetchReviews();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to delete review."
      );
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading Reviews...
      </div>
    );
  }

  return (
    <div className="mt-20">

      <div className="mb-10">

        <h2 className="text-3xl font-bold">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-4 mt-4">

          <StarRating
            rating={Math.round(
              averageRating
            )}
            size={28}
          />

          <span className="text-xl font-semibold">
            {averageRating.toFixed(1)}
          </span>

          <span className="text-gray-500">
            ({totalReviews} Reviews)
          </span>

        </div>

      </div>

      <ReviewForm
        initialReview={editingReview}
        loading={saving}
        onSubmit={handleSubmit}
      />

      <div className="space-y-6 mt-10">

        {reviews.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-10 text-center">
            No reviews yet.
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={
                currentUserId
              }
              onEdit={
                setEditingReview
              }
              onDelete={
                handleDelete
              }
            />
          ))
        )}

      </div>

    </div>
  );
}

export default ReviewSection;
import { useEffect } from "react";
import { useReviewStore } from "../store";
import Review from "./Review";

const ReviewList = () => {
  const { reviews, setReviews } = useReviewStore();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/reviews");
      setReviews(await response.json());
    })();
  }, []);

  return (
    <ul
      role="list"
      className="grid gap-4 max-sm:grid-cols-1 grid-cols-3 max-lg:grid-cols-2 2xl:grid-cols-4 justify-center items-center"
    >
      {reviews.map((review) => (
        <Review
          author={review.author}
          content={review.content}
          submitted_at={review.submitted_at}
        />
      ))}
    </ul>
  );
};

export default ReviewList;

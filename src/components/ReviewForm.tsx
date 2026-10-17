import { useState, type FormEvent } from 'react';
import StarRating from './StarRating';
import type { Review, ReviewInput } from '../types/api';

interface ReviewFormProps {
  initialReview?: Review;
  onSubmit: (payload: ReviewInput) => void | Promise<void>;
  onCancel?: () => void;
  submitting: boolean;
}

const ReviewForm = ({ initialReview, onSubmit, onCancel, submitting }: ReviewFormProps) => {
  const [rating, setRating] = useState(initialReview?.rating ?? 5);
  const [comment, setComment] = useState(initialReview?.comment ?? '');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void onSubmit({ rating, comment });
  };

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <label>
        Rating
        <StarRating name="review-rating" value={rating} onChange={setRating} />
      </label>
      <label>
        Comment
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          minLength={1}
          maxLength={2000}
          rows={4}
          required
        />
      </label>
      <div className="row-actions">
        <button type="submit" className="button" disabled={submitting}>
          {initialReview ? 'Save review' : 'Publish review'}
        </button>
        {onCancel && (
          <button type="button" className="button button-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;

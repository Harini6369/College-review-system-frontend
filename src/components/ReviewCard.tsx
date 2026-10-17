import StarRating from './StarRating';
import type { Review } from '../types/api';

interface ReviewCardProps {
  review: Review;
  canEdit: boolean;
  onEdit: (review: Review) => void;
  onDelete: (review: Review) => void;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));

const ReviewCard = ({ review, canEdit, onEdit, onDelete }: ReviewCardProps) => (
  <article className="card review-card">
    <div className="card-top">
      <div>
        <strong>{review.user?.name || 'Reviewer'}</strong>
        <p className="muted">
          {review.user?.role} · {formatDate(review.createdAt)}
        </p>
      </div>
      <StarRating value={review.rating} />
    </div>
    <p>{review.comment}</p>
    {canEdit && (
      <div className="row-actions">
        <button type="button" className="button button-ghost" onClick={() => onEdit(review)}>
          Edit
        </button>
        <button type="button" className="button button-danger" onClick={() => onDelete(review)}>
          Delete
        </button>
      </div>
    )}
  </article>
);

export default ReviewCard;

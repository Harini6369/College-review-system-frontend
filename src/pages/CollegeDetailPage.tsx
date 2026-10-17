import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCollege } from '../api/collegesApi';
import { createReview, deleteReview, listCollegeReviews, updateReview } from '../api/reviewsApi';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/EmptyState';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import StatusBanner from '../components/StatusBanner';
import type { College, Review, ReviewInput } from '../types/api';
import { getErrorMessage } from '../types/api';

const CollegeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [college, setCollege] = useState<College | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const ownReview = reviews.find((review) => review.user?.id === user?.id);

  const loadPage = useCallback(async () => {
    if (!id) {
      return;
    }
    const [collegeResponse, reviewsResponse] = await Promise.all([
      getCollege(id),
      listCollegeReviews(id, { limit: 50, sortBy: 'createdAt', sortOrder: 'desc' }),
    ]);
    setCollege(collegeResponse.data);
    setReviews(reviewsResponse.data);
  }, [id]);

  useEffect(() => {
    const load = async () => {
      try {
        setError('');
        await loadPage();
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };

    void load();
  }, [loadPage]);

  const handleReviewSubmit = async (payload: ReviewInput) => {
    if (!id) {
      return;
    }
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      if (editingReview) {
        await updateReview(editingReview.id, payload);
        setMessage('Review updated.');
      } else {
        await createReview(id, payload);
        setMessage('Review published.');
      }
      setEditingReview(null);
      await loadPage();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (review: Review) => {
    const confirmed = window.confirm('Delete this review?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteReview(review.id);
      setMessage('Review deleted.');
      await loadPage();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (!college && !error) {
    return <p className="page-status">Loading college...</p>;
  }

  if (!college) {
    return <StatusBanner tone="danger">{error}</StatusBanner>;
  }

  const canWriteReview = Boolean(user);
  const showCreateForm = canWriteReview && !ownReview && !editingReview;

  return (
    <section className="page">
      <Link to="/" className="back-link">
        Back to colleges
      </Link>
      <header className="page-header">
        <div>
          <p className="eyebrow">{college.location}</p>
          <h1>{college.name}</h1>
          <p className="muted">{college.description}</p>
          {college.website && (
            <a href={college.website} target="_blank" rel="noreferrer">
              Visit website
            </a>
          )}
        </div>
        <div className="stat-box">
          <strong>{college.averageRating.toFixed(2)}</strong>
          <span>{college.reviewCount} reviews</span>
        </div>
      </header>

      <StatusBanner tone="danger">{error}</StatusBanner>
      <StatusBanner>{message}</StatusBanner>

      {showCreateForm && (
        <div className="card">
          <h2>Write a review</h2>
          <ReviewForm onSubmit={handleReviewSubmit} submitting={submitting} />
        </div>
      )}

      {editingReview && (
        <div className="card">
          <h2>Edit review</h2>
          <ReviewForm
            initialReview={editingReview}
            onSubmit={handleReviewSubmit}
            onCancel={() => setEditingReview(null)}
            submitting={submitting}
          />
        </div>
      )}

      <div className="stack">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <EmptyState title="No reviews yet" message="Be the first to share an experience." />
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              canEdit={Boolean(user && (user.role === 'admin' || review.user?.id === user.id))}
              onEdit={setEditingReview}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default CollegeDetailPage;

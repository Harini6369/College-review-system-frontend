import { request } from './http';
import type { ListReviewsQuery, Review, ReviewInput } from '../types/api';

export const listCollegeReviews = (collegeId: string, body: Omit<ListReviewsQuery, 'collegeId'> = {}) =>
  request<Review[]>('/api/colleges/reviews/list', { body: { collegeId, ...body } });

export const createReview = (collegeId: string, body: ReviewInput) =>
  request<Review>('/api/colleges/reviews/create', { body: { collegeId, ...body } });

export const updateReview = (id: string, body: Partial<ReviewInput>) =>
  request<Review>('/api/reviews/update', { body: { id, ...body } });

export const deleteReview = (id: string) => request<null>('/api/reviews/delete', { body: { id } });

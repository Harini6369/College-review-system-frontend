export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiSuccess<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface CollegeCreator {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface College {
  id: string;
  name: string;
  description: string;
  location: string;
  website: string | null;
  createdBy: CollegeCreator;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ReviewCollegeRef {
  id: string;
  name: string;
  location: string;
}

export interface Review {
  id: string;
  college: ReviewCollegeRef;
  user: ReviewUser;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
}

export interface ListCollegesQuery {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  sortBy?: 'name' | 'createdAt' | 'averageRating';
  sortOrder?: 'asc' | 'desc';
}

export interface CollegeInput {
  name: string;
  description: string;
  location: string;
  website?: string;
}

export interface ReviewInput {
  rating: number;
  comment: string;
}

export interface ListReviewsQuery {
  page?: number;
  limit?: number;
  collegeId?: string;
  userId?: string;
  rating?: number;
  search?: string;
  sortBy?: 'createdAt' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

export interface ValidationDetail {
  field: string;
  message: string;
}

export class RequestError extends Error {
  status?: number;

  details?: ValidationDetail[];

  constructor(message: string, status?: number, details?: ValidationDetail[]) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
    this.details = details;
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof RequestError || error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong';
}

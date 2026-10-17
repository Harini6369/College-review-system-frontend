import { request } from './http';
import type { User } from '../types/api';

export interface ListUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: User['role'];
}

export const listUsers = (body: ListUsersQuery = {}) => request<User[]>('/api/users/list', { body });

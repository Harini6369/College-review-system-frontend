import { request } from './http';
import type { College, CollegeInput, ListCollegesQuery } from '../types/api';

export const listColleges = (body: ListCollegesQuery = {}) =>
  request<College[]>('/api/colleges/list', { body });

export const getCollege = (id: string) => request<College>('/api/colleges/get', { body: { id } });

export const createCollege = (body: CollegeInput) =>
  request<College>('/api/colleges/create', { body });

export const updateCollege = (id: string, body: Partial<CollegeInput>) =>
  request<College>('/api/colleges/update', { body: { id, ...body } });

export const deleteCollege = (id: string) =>
  request<null>('/api/colleges/delete', { body: { id } });

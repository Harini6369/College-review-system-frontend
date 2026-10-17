import { request } from './http';
import type { AuthPayload, LoginCredentials, RegisterPayload, User } from '../types/api';

export const registerAccount = (body: RegisterPayload) =>
  request<AuthPayload>('/api/auth/register', { body });

export const loginAccount = (body: LoginCredentials) =>
  request<AuthPayload>('/api/auth/login', { body });

export const getCurrentUser = (token: string) => request<User>('/api/auth/me', { token });

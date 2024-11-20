import axios from 'axios';
import { AuthResponse, Testimonial, User } from '../types';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (email: string, password: string) => 
    api.post<AuthResponse>('/auth/login', { email, password }),
  register: (data: { email: string; password: string; name: string; company: string; role: string }) =>
    api.post<AuthResponse>('/auth/register', data),
  me: () => api.get<User>('/auth/me'),
};

export const testimonials = {
  getAll: () => api.get<Testimonial[]>('/testimonials'),
  create: (data: FormData) => api.post<Testimonial>('/testimonials', data),
  update: (id: string, data: Partial<Testimonial>) => 
    api.patch<Testimonial>(`/testimonials/${id}`, data),
  delete: (id: string) => api.delete(`/testimonials/${id}`),
  approve: (id: string) => api.post(`/testimonials/${id}/approve`),
  reject: (id: string) => api.post(`/testimonials/${id}/reject`),
};
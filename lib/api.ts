import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://five2weekends-backend.onrender.com';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (data: any) => apiClient.post('/api/auth/register', data),
  login: (data: any) => apiClient.post('/api/auth/login', data),
  refresh: (token: string) => apiClient.post('/api/auth/refresh', { token })
};

export const companyApi = {
  getAll: () => apiClient.get('/api/companies'),
  getById: (id: number) => apiClient.get(`/api/companies/${id}`),
  create: (data: any) => apiClient.post('/api/companies', data),
  update: (id: number, data: any) => apiClient.put(`/api/companies/${id}`, data)
};

export const eventApi = {
  getAll: () => apiClient.get('/api/events'),
  getById: (id: number) => apiClient.get(`/api/events/${id}`),
  create: (data: any) => apiClient.post('/api/events', data),
  update: (id: number, data: any) => apiClient.put(`/api/events/${id}`, data),
  publish: (id: number) => apiClient.post(`/api/events/${id}/publish`, {}),
  getRegistrations: (id: number) => apiClient.get(`/api/events/${id}/registrations`)
};

export const resortApi = {
  getAll: () => apiClient.get('/api/resorts'),
  getById: (id: number) => apiClient.get(`/api/resorts/${id}`)
};

export const registrationApi = {
  invite: (eventId: number, participants: any[]) =>
    apiClient.post('/api/registrations/invite', { event_id: eventId, participants }),
  getByToken: (token: string) => apiClient.get(`/api/registrations/${token}`),
  submitByToken: (token: string, data: any) => apiClient.post(`/api/registrations/${token}`, data),
  getEventRegistrations: (eventId: number) =>
    apiClient.get(`/api/registrations/event/${eventId}`)
};

export const paymentApi = {
  initiate: (data: any) => apiClient.post('/api/payments/initiate', data),
  getByRegistration: (registrationId: number) =>
    apiClient.get(`/api/payments/${registrationId}`)
};

export const blogApi = {
  create: (eventId: number, data: any) =>
    apiClient.post(`/api/blog/${eventId}`, data),
  getEventPosts: (eventId: number) =>
    apiClient.get(`/api/blog/event/${eventId}`),
  getById: (id: number) => apiClient.get(`/api/blog/${id}`)
};

export const mediaApi = {
  upload: (eventId: number, data: any) =>
    apiClient.post(`/api/media/${eventId}/upload`, data),
  getEventMedia: (eventId: number) =>
    apiClient.get(`/api/media/event/${eventId}`)
};

export default apiClient;

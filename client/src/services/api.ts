import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../features/auth/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token !== 'null') {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQuery: typeof rawBaseQuery = async (args, extraApi, extraOptions) => {
  const result = await rawBaseQuery(args, extraApi, extraOptions);

  if (result.error?.status === 401) {
    extraApi.dispatch(logout());
    extraApi.dispatch(api.util.resetApiState());
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User'],
  endpoints: () => ({}),
});
import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://127.0.0.1:8000/api' : '/api');

const getCookie = (name) => {
  const cookies = `; ${document.cookie}`;
  const parts = cookies.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return '';
};

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const method = (config.method || 'get').toLowerCase();
  const unsafe = method === 'post' || method === 'put' || method === 'patch' || method === 'delete';
  if (unsafe) {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
  }
  return config;
});

export default api;

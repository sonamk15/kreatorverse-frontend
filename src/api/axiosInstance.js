import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL;

export const axiosUnauthorizedInstance = axios.create({
  // use this for public api calls
  baseURL
});

export function axiosAuthorizedInstance() {
  const token = localStorage.getItem('token');
  const http = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}` }
  });
  return http;
}

import axios from 'axios';
import store from '../redux/store';

const baseURL = process.env.REACT_APP_API_URL;

export const axiosUnauthorizedInstance = axios.create({
  // use this for public api calls
  baseURL
});

export function axiosAuthorizedInstance() {
  const { token } = store.getState().auth;
  const http = axios.create({
    baseURL,
    headers: { Authorization: token }
  });
  return http;
}

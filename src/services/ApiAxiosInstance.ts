import axios, { AxiosInstance } from 'axios';

// outside BikeApi file in case of token implementation or over api call to come
// setup base url from current .env file
const apiAxiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  data: {},
});

export default apiAxiosInstance;

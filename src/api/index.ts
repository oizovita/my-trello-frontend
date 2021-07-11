import axios from 'axios';
import { api } from '@/common/constants';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 123',
  },
});

export default instance;

import axios from 'axios';
import store from '@/store';

export default () => axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'x-access-token': store.getters.token,
  },
});

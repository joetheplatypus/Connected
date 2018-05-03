import Api from '@/services/Api';

export default {
  index() {
    return Api().get('users');
  },
  get(id) {
    return Api().get(`users/${id}`);
  },
};

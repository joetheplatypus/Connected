import Api from '@/services/Api';

export default {
  get() {
    return Api().get('profile');
  },
  put(info) {
    return Api().put('profile', info);
  },
  putPass(info) {
    return Api().put('profile/password', info);
  },
  delete() {
    return Api().delete('profile');
  },
};

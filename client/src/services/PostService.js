import Api from '@/services/Api';

export default {
  index() {
    return Api().get('posts');
  },
  get(postId) {
    return Api().get(`posts/${postId}`);
  },
  post(post) {
    return Api().post('posts', post);
  },
  put(post) {
    return Api().put(`posts/${post.id}`, post);
  },
  delete(postId) {
    return Api().delete(`posts/${postId}`);
  },
};

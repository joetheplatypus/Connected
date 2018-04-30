import Vue from 'vue';
import Router from 'vue-router';
import IndexPosts from '@/components/posts/IndexPosts';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: IndexPosts,
    },
  ],
});

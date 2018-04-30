import Vue from 'vue';
import Router from 'vue-router';
import IndexPosts from '@/components/posts/IndexPosts';
import CreatePost from '@/components/posts/CreatePost';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: IndexPosts,
    },
    {
      path: '/posts/create',
      name: 'create-post',
      component: CreatePost,
    },
  ],
});

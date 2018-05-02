import Vue from 'vue';
import Router from 'vue-router';
import IndexPosts from '@/components/posts/IndexPosts';
import CreatePost from '@/components/posts/CreatePost';
import ViewProfile from '@/components/profile/ViewProfile';
import Login from '@/components/auth/Login';
import Store from '@/store/';

Vue.use(Router);

const router = new Router({
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
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ViewProfile,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.name === 'register' || Store.state.loggedIn) {
    next();
  } else {
    next(false);
  }
});

export default router;

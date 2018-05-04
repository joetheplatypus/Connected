import Vue from 'vue';
import Router from 'vue-router';
import IndexPosts from '@/components/posts/IndexPosts';
import CreatePost from '@/components/posts/CreatePost';
import ViewProfile from '@/components/profile/ViewProfile';
import Login from '@/components/auth/Login';
import Logout from '@/components/auth/Logout';
import Register from '@/components/auth/Register';

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
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ViewProfile,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.name === 'register' || window.localStorage.getItem('token')) {
    next();
  } else {
    next(false);
  }
});

export default router;

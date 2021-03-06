import Vue from 'vue';
import Router from 'vue-router';
import IndexPosts from '@/components/posts/IndexPosts';
import CreatePost from '@/components/posts/CreatePost';
import EditPost from '@/components/posts/EditPost';
import ViewPost from '@/components/posts/ViewPost';
import ViewProfile from '@/components/profile/ViewProfile';
import EditProfile from '@/components/profile/EditProfile';
import EditPassword from '@/components/profile/EditPassword';
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
      path: '/posts/:postId/edit',
      name: 'edit-post',
      component: EditPost,
    },
    {
      path: '/posts/:postId',
      name: 'view-post',
      component: ViewPost,
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
    {
      path: '/profile/edit',
      name: 'edit-profile',
      component: EditProfile,
    },
    {
      path: '/profile/edit/password',
      name: 'edit-password',
      component: EditPassword,
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

import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import login from '@/components/login';
import register from '@/components/register';
import chatroom from '@/components/chatroom';

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: chatroom,
    },
  ],
});

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home.vue';

// @ts-ignore
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: (_) => {
      return { path: '/home' };
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
    redirect: (_) => {
      return { path: '/404' };
    }
  },
  {
    path: '/404', // 路由未匹配到，进入这个
    component: () => import(/* webpackChunkName: "About" */ '@/pages/404.vue')
  }
];
const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth'
    };
  }
});
export default router;
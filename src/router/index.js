import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list_url',
    name: 'listUrl',
    component: () => import(/* webpackChunkName: "about" */ '../views/UrlList.vue')
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import(/* webpackChunkName: "analysis" */ '../views/AnalysisView.vue'),
  },
  {
    path: '/charts/:type',
    name: 'charts',
    component: () => import(/* webpackChunkName: "analysis" */ '../views/ChartsView.vue'),
  },
  {
    path: '/dynamic/',
    name: 'chartsLineView',
    component: () => import(/* webpackChunkName: "analysis" */ '../views/ChartsLineView'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page404',
    component: () => import('../views/404View'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

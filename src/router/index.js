import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/views/Users.vue'
import User from '@/views/User.vue'
import Favorites from '@/views/Favorites.vue'

//Vue.use(VueRouter)
if (!process || process.env.NODE_ENV !== "test") {
  Vue.use(Router);
}

const baseRoute = process.env.VUE_APP_BASE_NAME_ROUTE;

const routes = [
  {
    path: '/',
    name: 'users',
    component: Users,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  }
]

const router = new Router({
  mode: 'history',
  base: `/${baseRoute}/`,
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/home.vue';
import Login from '../views/login/login.vue';
import Register from '../views/register/register.vue';
import Initial from '../views/initial/initial.vue';
import Users from '../views/users/users.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: "/",
    name: "Initial",
    component: Initial
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
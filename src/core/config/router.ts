import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/home.vue';
import Login from '../views/login/login.vue';
import Users from '../views/users/users.vue';
import Patients from '../views/patients/patients.vue';
import PatientsDetails from '../views/patients/patients-details.vue';
import PatientsAdd from '../views/patients/patients-add.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients,
    meta: { requiresAuth: true }
  },
  {
    path: '/patients/add',
    name: 'PatientsAdd',
    component: PatientsAdd,
    meta: { requiresAuth: true }
  },
  {
    path: '/patients/:customerId/details',
    name: 'PatientsDetails',
    component: PatientsDetails,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router

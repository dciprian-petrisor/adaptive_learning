import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('src/layouts/LandingLayout.vue'),
    children: [
      { name: 'landing', path: '', component: () => import('src/pages/Landing/Landing.vue') }
    ],
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: '/dashboard',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { name: 'dashboard', path: '', component: () => import('src/pages/Dashboard/Dashboard.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activate',
    component: () => import('src/layouts/LandingLayout.vue'),
    children: [
      {
        name: 'activate', path: ':token', props: true, component: () => import('src/pages/Activate/Activate.vue')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('src/layouts/LandingLayout.vue'),
    children: [
      { name: 'register', path: '', component: () => import('src/pages/Register/Register.vue') }
    ],
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: '/login',
    component: () => import('src/layouts/LandingLayout.vue'),
    children: [
      { name: 'login', path: '', component: () => import('src/pages/Login/Login.vue') }
    ],
    meta: {
      requiresNotAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('src/pages/Error404/Error404.vue')
  }
]

export default routes

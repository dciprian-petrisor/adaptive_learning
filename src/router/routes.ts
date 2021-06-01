import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'landing',
    component: () => import('src/layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Landing.vue') }
    ],
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Dashboard.vue') }
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
        path: ':token', props: true, component: () => import('src/pages/Activate.vue')
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('src/layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Register.vue') }
    ],
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('src/layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Login.vue') }
    ],
    meta: {
      requiresNotAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

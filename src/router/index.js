import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/',
    redirect: () => {
      const role = store.getters.role
      if (role === 'ROLE_ADMIN') {
        return '/admin'
      } else if (role === 'ROLE_COMMUNITY') {
        return '/community'
      } else {
        store.dispatch('logout').then(() => {
          return '/login'
        })
      }
    }
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/index'),
    redirect: '/admin/group',
    children: [
      {
        name: 'group',
        path: 'group',
        component: () => import('@/views/admin/group')
      },
      {
        name: 'community',
        path: 'community',
        component: () => import('@/views/admin/community')
      },
      {
        name: 'accuse',
        path: 'accuse',
        component: () => import('@/views/admin/accuse')
      },
      {
        name: 'password',
        path: 'password',
        component: () => import('@/views/admin/password')
      }
    ]
  },
  {
    path: '/community',
    component: () => import('@/views/community/index'),
    redirect: '/community/profile',
    children: [
      {
        name: 'profile',
        path: 'profile',
        component: () => import('@/views/community/profile')
      },
      {
        name: 'member',
        path: 'member',
        component: () => import('@/views/community/member')
      },
      {
        name: 'password',
        path: 'password',
        component: () => import('@/views/community/password')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

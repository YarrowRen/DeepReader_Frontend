import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: '主页',
        meta: { title: '主页', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/study',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/study/index'),
        name: '《故事新编》',
        meta: { title: '《故事新编》', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: '/studyLook',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/studyLook/index'),
        name: '查看文章',
        meta: { title: '查看文章', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: '/studyQuestion',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/studyQuestion/index'),
        name: '创建测试题',
        meta: { title: '创建测试题', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/exam/index'),
        name: '《故事新编》测试',
        meta: { title: '《故事新编》测试', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/bookSelection',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/bookSelection/index'),
        name: '阅读文章',
        meta: { title: '阅读文章', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/examSelection',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/examSelection/index'),
        name: '他问我答',
        meta: { title: '他问我答', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/uploadFile',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/uploadFile/index'),
        name: '上传文章',
        meta: { title: '上传文章', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/discussionBoard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/discussionBoard/index'),
        name: '讨论区',
        meta: { title: '讨论区', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/discussion',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/discussion/index'),
        name: '讨论',
        meta: { title: '讨论', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: '/practiceSelection',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/practiceSelection/index'),
        name: '练习书目选择',
        meta: { title: '练习书目选择', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/book/index'),
        name: '图书详情',
        meta: { title: '图书详情', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: '/books',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/books/index'),
        name: '图书管理侧边栏',
        meta: { title: '图书管理', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: '个人信息',
        meta: { title: '个人信息', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: '/select',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/select/index'),
        name: '图书选择',
        meta: { title: '图书选择', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

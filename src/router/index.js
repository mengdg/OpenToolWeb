import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

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
    redirect: '/dashboard'
  },
  {
    path: '/blueopen',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: '导航', icon: 'el-icon-s-platform', affix: true },
    children: [
      {
        path: '',
        component: () => import('@/views/navigation/index'),
        name: 'Dashboard',
        meta: { title: '导航', icon: 'el-icon-s-platform' }
      }, {
        path: 'createkind',
        component: () => import('@/views/navigation/kind/index'),
        name: 'Kind',
        meta: { title: '分类管理', icon: 'el-icon-s-management', roles: ['admin', 'editor'] }
      }, {
        path: 'navigations',
        component: () => import('@/views/navigation/list/index'),
        name: 'Nav',
        meta: { title: '创建卡片', icon: 'el-icon-edit-outline', roles: ['admin', 'editor'] }
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
  {
    path: '/tools',
    component: Layout,
    redirect: '/tools/list',
    name: 'Tools',
    meta: {
      title: '工具列表',
      icon: 'el-icon-s-promotion'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/tools/list/index'),
        name: 'ToolList',
        meta: { title: '工具列表', icon: 'el-icon-s-promotion', activeMenu: '/tools/list' }
      }, {
        path: 'edit/:id',
        component: () => import('@/views/tools/edit/index'),
        name: 'EditTool',
        meta: { title: '编辑工具', icon: 'edit', roles: ['admin', 'editor'], noCache: true },
        hidden: true
      }, {
        path: 'tool/:path(.*)/:id',
        component: () => import('@/views/tools/tool/index'),
        name: 'Tool',
        meta: { title: '详情页', icon: 'el-icon-s-release' },
        hidden: true
      }, {
        path: 'project',
        component: () => import('@/views/tools/project/index'),
        name: 'Project',
        meta: { title: '项目管理', icon: 'el-icon-s-management', roles: ['admin'] }
      }, {
        path: 'create',
        component: () => import('@/views/tools/edit/index'),
        name: 'Create Tool',
        meta: { title: '创建工具', icon: 'el-icon-edit-outline', roles: ['admin', 'editor'], noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
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

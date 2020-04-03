import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/map/Map'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/map',
    component: Layout,
    meta: { title: '地图管理', icon: 'international' },
    children: [
      {
        path: 'impLayer',
        name: 'impLayer',
        component: () => import('@/views/map/MapFileUpload'),
        meta: { title: '添加图层' }
      },
      {
        path: 'index',
        name: '绘制图层',
        component: () => import('@/views/map/DrawMap'),
        meta: { title: '绘制图层' }
      }
    ]
  },
  {
    path: '/relation',
    component: Layout,
    meta: { title: '地点关联', icon: 'form' },
    children: [
      {
        path: 'index',
        name: '关联列表',
        component: () => import('@/views/table/Relation'),
        meta: { title: '关联列表' }
      },
      {
        path: 'addRelation',
        name: '添加关联',
        component: () => import('@/views/form/Relation'),
        meta: { title: '添加关联' }
      }
    ]
  },

  {
    path: '/busInfo',
    component: Layout,
    meta: { title: '校车信息', icon: 'tree-table' },
    children: [
      {
        path: 'index',
        name: '校车信息列表',
        component: () => import('@/views/table/BusInfo'),
        meta: { title: '校车信息列表' }
      },
      {
        path: 'addBusInfo',
        name: '添加校车信息',
        component: () => import('@/views/form/BusInfo'),
        meta: { title: '添加校车信息' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    meta: { title: '用户权限管理', icon: 'user' },
    children: [
      {
        path: 'users',
        name: '用户管理',
        component: () => import('@/views/table/User'),
        meta: { title: '用户管理' }
      },
      {
        path: 'userRoles',
        name: '用户角色',
        component: () => import('@/views/table/UserRole'),
        meta: { title: '用户角色' }
      },
      {
        path: 'roles',
        name: '角色管理',
        component: () => import('@/views/table/Role'),
        meta: { title: '角色管理' }
      },
      {
        path: 'roleResources',
        name: '角色权限',
        component: () => import('@/views/table/RoleResource'),
        meta: { title: '角色权限' }
      },
      {
        path: 'resource',
        name: '资源管理',
        component: () => import('@/views/table/Resource'),
        meta: { title: '资源管理' }
      },
      {
        path: 'permission',
        name: '权限添加',
        component: () => import('@/views/form/Permission'),
        meta: { title: '权限添加' }
      }
    ]
  },
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

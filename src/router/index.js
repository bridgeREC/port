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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/register',
    component: () => import('@/views/register/index'),
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
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/announcement',
    component: Layout,
    redirect: '/announcement/index',
    name: 'announcementManage',
    meta: { title: '公告功能', icon: 'el-icon-s-help' },
    children:[
    { path: 'announcement',
      name: 'announcement',
      component: () => import('@/views/announcement/index'),
      meta: { title: '公告', icon: 'el-icon-view' }
    }
    ]
  },

    {
    path: '/ReleaseQuery',
    component: Layout,
    redirect: '/ReleaseQuery/index',
    name: 'ReleaseQueryManage',
    meta: { title: '查询功能', icon: 'el-icon-s-help' },
    children:[
    { path: 'ReleaseQuery',
      name: 'ReleaseQuery',
      component: () => import('@/views/ReleaseQuery/index'),
      meta: { title: '查询提交放行', icon: 'el-icon-search' }
    }]
  },

  {
    path: '/appeal',
    component: Layout,
    redirect: '/appeal/index',
    name: 'appealManage',
    meta: { title: '申述功能', icon: 'el-icon-s-help' },
    children:[
    { path: 'appealQuery',
      name: 'appealQuery',
      component: () => import('@/views/appeal/index'),
      meta: { title: '申述', icon: 'el-icon-s-help' }
    }]
  },
    {
    path: '/ship',
    component: Layout,
    redirect: '/ship/index',
    name: 'shipManage',
    meta: { title: '所属船只信息', icon: 'el-icon-s-help' },
    children:[
    { path: 'ship',
      name: 'ship',
      component: () => import('@/views/ship/index'),
      meta: { title: '修改船只信息', icon: 'el-icon-edit-outline' }
    }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/user',
    name: 'sysManage',
    meta: { title: '系统管理', icon: 'el-icon-user-solid' , roles: ['admin','root']},
    children: [
      {
        path: 'announcement',
        name: 'announcements',
        component: () => import('@/views/sys/announcement'),
        meta: { title: '公告管理', icon: '' }
      },
      {
        path: 'clearance',
        name: 'clearance',
        component: () => import('@/views/sys/clearance'),
        meta: { title: '放行管理', icon: '' }
      },
      {
        path: 'appeals',
        name: 'appeals',
        component: () => import('@/views/sys/appeals'),
        meta: { title: '申述管理', icon: '' }
      },
      {
        path: 'ship',
        name: 'ship',
        component: () => import('@/views/sys/ship'),
        meta: { title: '船舶管理', icon: '' }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/sys/user'),
        meta: { title: '用户管理', icon: '' }
      }
    ]
  },
  {
    path: '/backsys',
    component: Layout,
    redirect: '/backsys/user',
    name: 'rootManage',
    meta: { title: '后台功能', icon: 'el-icon-s-help', roles: ['root']},
    children:[
    { path: '/backsys/user',
      name: 'root',
      component: () => import('@/views/backsys/user'),
      meta: { title: '管理员后台', icon: 'el-icon-user' }
    },]
  },
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

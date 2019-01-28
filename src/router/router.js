import Vue from 'vue'
import Router from 'vue-router'
import { routerPermission } from './eventButtonPermission'
Vue.use(Router)

/*  App */
import App from '../App.vue'
import View1 from '../views/view1'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

// 菜单额外配置项
const ROUTE_SCOPE_INTELLIGENT_CALL = 'INTELLIGENT_CALL'
const ROUTE_SCOPE_MARKETING_HALL = 'MARKETING_HALL'
const ROUTE_SCOPE_CRM = 'CRM'
const ROUTE_SCOPE_AUDIO_INTERACT = 'AUDIO_INTERACT'
const ROUTE_SCOPE_SETTING = 'UI_SYSTEM_MANAGEMENT' // SETTING

export const routeScopeMap = {
  [ROUTE_SCOPE_INTELLIGENT_CALL]: {
    order: 1,
    title: '大数据管家'
  },
  [ROUTE_SCOPE_MARKETING_HALL]: {
    order: 2,
    title: '营销大厅'
  },
  [ROUTE_SCOPE_CRM]: {
    order: 3,
    title: 'CRM'
  },
  [ROUTE_SCOPE_AUDIO_INTERACT]: {
    order: 4,
    title: '语音交互'
  },
  [ROUTE_SCOPE_SETTING]: {
    order: 5,
    title: '系统管理'
  }
}

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: asyncRouterMap
})

export const asyncRouterMap = [
  {
    path: '',
    component:  App,
    redirect: '/dashboard',
    meta: {
      scope: ROUTE_SCOPE_INTELLIGENT_CALL // 所有要显示的路由必须配置scope
    },
    name: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: View1,
        name: 'Dashboard',
        meta: { title: routerPermission.dashboard.name, icon: 'menu_home', noCache: true, permissionCode: routerPermission.dashboard.code }
      }
    ]
  },
  {
    path: '/callTask',
    component:  App,
    alwaysShow: true, // will always show the root menu
    name: 'callTask',
    redirect: '/callTask/task',
    meta: {
      scope: ROUTE_SCOPE_MARKETING_HALL,
      icon: 'ic_message',
      title: '智能外呼'
    },
    children: [
      {
        path: 'task',
        component: View1,
        name: 'callTaskList',
        meta: {
          title: routerPermission.callTaskList.name, icon: 'ic_message', permissionCode: routerPermission.callTaskList.code
        }
      },
      {
        path: 'blackList',
        component: View1,
        name: 'blackListView',
        meta: {
          title: routerPermission.blackListView.name, icon: 'ic_message', permissionCode: routerPermission.blackListView.code
        }
      }
    ]
  },
  {
    path: '/cost',
    component:  App,
    meta: {
      title: '费用管理',
      icon: 'menu_cost',
      noCache: true,
      scope: ROUTE_SCOPE_MARKETING_HALL
    },
    redirect: '/cost/spend',
    name: 'cost',
    children: [
      {
        path: 'spend',
        component: View1,
        name: 'spend',
        meta: { title: routerPermission.spend.name, icon: 'menu_cost', noCache: true, permissionCode: routerPermission.spend.code }
      },
      {
        path: 'recharge',
        component: View1,
        name: 'recharge',
        meta: { title: routerPermission.recharge.name, icon: 'menu_cost', noCache: true, permissionCode: routerPermission.recharge.code }
      }
    ]
  },
  {
    path: '/callRecord',
    component:  App,
    alwaysShow: true, // will always show the root menu
    name: 'callRecord',
    redirect: '/callRecord/aiRecord',
    meta: {
      scope: ROUTE_SCOPE_CRM,
      title: '呼叫记录',
      icon: 'ic_message'
    },
    children: [
      {
        path: 'aiRecord',
        component: View1,
        name: 'aiCallRecordList',
        meta: {
          title: routerPermission.aiCallRecordList.name, icon: 'ic_message', permissionCode: routerPermission.aiCallRecordList.code
        }
      },
      {
        path: 'peopleRecord',
        component: View1,
        name: 'callRecordList',
        meta: {
          title: routerPermission.callRecordList.name, icon: 'ic_message', permissionCode: routerPermission.callRecordList.code
        }
      }
    ]
  },
  {
    path: '/setting',
    component:  App,
    redirect: '/setting/index',
    name: 'systemSetting',
    meta: {
      scope: ROUTE_SCOPE_SETTING
    },
    children: [
      {
        path: 'index',
        component: View1,
        name: 'systemSettingIndex',
        meta: {
          icon: 'menu_setting',
          title: routerPermission.systemSettingIndex.name,
          permissionCode: routerPermission.systemSettingIndex.code
        }
      }
    ]
  },
  {
    path: '/operationLog',
    component:  App,
    redirect: '/operationLog/index',
    name: 'operationLog',
    meta: {
      scope: ROUTE_SCOPE_SETTING
    },
    children: [
      {
        path: 'index',
        component: View1,
        name: '操作日志',
        meta: { title: routerPermission.operationLog.name, icon: 'menu_log', noCache: true, permissionCode: routerPermission.operationLog.code }
      }
    ]
  }

  // {
  //   path: '/permission',
  //   component:  App,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]


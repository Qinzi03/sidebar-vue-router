import { asyncRouterMap } from './router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function filterAsyncRouterByPermisstion(asyncRouterMap, permissionRouter) {
  // const tmpAry = []
  const permissions = permissionRouter
  const newRouter = []
  asyncRouterMap.forEach(item => {

    const temArr = []
    if (item.children) {
      item.children.forEach(childrenObj => {
        if (permissions.length) {
          const somePermisstion = permissions.some(item2 => {
            if (!childrenObj.meta.permissionCode) {
              return true
            }
            return item2.code === childrenObj.meta.permissionCode
          })
          if (somePermisstion) {
            temArr.push(childrenObj)
          }
        } else {
          // 后端未定义权限，则将permissionCode 为空的（常规路由）返回
          if (!childrenObj.meta.permissionCode) {
            temArr.push(childrenObj)
          }
        }
        
      })
    }
    item.children = temArr
    if (temArr.length) {
      newRouter.push(item)
    }
  })
  return newRouter
}

export function GenerateRoutes (permissionRouter) {
  return new Promise(resolve => {
    const accessedRouters = filterAsyncRouterByPermisstion(asyncRouterMap, permissionRouter)
    resolve(accessedRouters)
  })
}


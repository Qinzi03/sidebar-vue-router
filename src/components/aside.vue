<template>
  <el-scrollbar>
    <el-menu
      :router="router"
      :default-active="defaultActive"
      :collapse="collapse"
      :mode="mode"
      :style="{width: width}"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
    >
      <sidebar-item v-for="route in routeList" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
    <span v-show="false">{{routeListChange}}</span>
  </el-scrollbar>
</template>
<script>
import { GenerateRoutes } from '../router/permission'
import SidebarItem from './SidebarItem'
// import SubRouterItem from './subRoute.vue'

export default {
  props: {
    isExpand: {
      type: Boolean,
      default: true
    },
    'defaultActive': {
      type: String,
      default: ' '
    },
    'mode': {
      type: String,
      default: 'vertical'
    },
    'router': {
      type: Boolean,
      default: false
    },
    'collapse': {
      type: Boolean,
      default: false
    },
    'width': {
      type: String,
      default: '200px'
    },
    'backgroundColor': {
      type: String,
      default: '#304156'
    },
    'textColor': {
      type: String,
      default: '#bfcbd9'
    },
    'activeTextColor': {
      type: String,
      default: '#409EFF'
    },
    'permissionRouters': {
      type: Array,
      default: function () {
        return []
      }
    },
    'routes': {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    SidebarItem
  },
  data() {
    return {
      routeList: [],
      lastMeta: null,
      currentRouteList: [],
      parentRouteName: '',
    }
  },
  computed: {
    routeListChange () {
      this.$nextTick(_ => {
      GenerateRoutes(this.permissionRouters)
      .then(res => {
        this.routeList = res
        return res
      })
      })
    }
  }
}
</script>

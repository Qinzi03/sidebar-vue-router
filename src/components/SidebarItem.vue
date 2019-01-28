<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <template v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow">
      <!-- <a :href="onlyOneChild.path" @click="clickLink(onlyOneChild.path,$event)"> -->
      <el-menu-item :index="resolvePath(onlyOneChild.path)" class="el-submenu" :class="{'submenu-title-noDropdown':!isNest}">
        <svg-icon :icon-class="onlyOneChild.meta.icon"/>
        <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
      </el-menu-item>
      <!-- </a> -->
    </template>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <svg-icon :icon-class="item.meta.icon"/>
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <el-menu-item-group v-if="!child.hidden" v-for="(child, index) in item.children" :key="index">
        <template>
        <sidebar-item v-if="child.children&&child.children.length>0" :is-nest="false" :item="child" :key="child.path" :base-path="resolvePath(child.path)" class="nest-menu"/>

        <!-- <a v-else :href="child.path" :key="child.name" @click="clickLink(child.path,$event)"> -->
        <el-menu-item :index="resolvePath(child.path)" :key="child.name">
          <svg-icon :icon-class="child.meta.icon"/>
          <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
        </el-menu-item>
        <!-- </a> -->
      </template>
      </el-menu-item-group>
      
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
// import { validateURL } from '@/utils/validate'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return validateURL(routePath)
    },
    clickLink(routePath, e) {
      if (!this.isExternalLink(routePath)) {
        e.preventDefault()
        const path = this.resolvePath(routePath)
        this.$router.push(path)
      }
    }
  }
}
</script>
<style>
li{
  margin: 0;
}
</style>



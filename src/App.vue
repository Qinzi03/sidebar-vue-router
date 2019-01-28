<template>
  <div id="app">
    <h-aside
      :default-active="$route.path"
      :router="true"
      :permissionRouters="permissionRouters"
    ></h-aside>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      permissionRouters: [  // 后端返回所允许的路由
        {
          code: "UI_INTELLIGENT_ANALYSIS",
          description: "权限管理",
          name: "权限管理",
          type: "UI"
        }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

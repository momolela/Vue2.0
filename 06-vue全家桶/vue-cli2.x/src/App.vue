<template>
  <div id="app">
    <!-- 
      <router-link> 是 vue-router 中注册的一个全局组件，
      <router-link> 默认会被渲染成 a 标签 
      tag="button" 属性，可以让 <router-link> 渲染成 button 标签
      replace 属性，是通过 history.replaceState() 去做的路由替换
      active-class="active" 属性，可以修改 <router-link> 的默认 calss 属性
    -->
    <router-link to="/aaa" tag="button" replace active-class="active">aaa</router-link>
    <router-link to="/bbb" tag="button" replace active-class="active">bbb</router-link>



    <!--
      to 属性能够跳转到具体的路由界面，:to="'/user/' + userId" 可以传递具体的参数到路由的目的界面，目的地界面通过 $route.params 可以获取
      to 属性可以接收对象，path 是要路由的目的地界面，query 是通过 URL 拼接参数的形式传递参数到目的地界面，目的地界面通过 $route.query 可以获取
    -->
    <router-link :to="'/user/' + userId" tag="button" replace active-class="active">to user 动态路由 params 传参</router-link>
    <router-link :to="{ path: '/user', query: { userId: userId } }" tag="button" replace active-class="active">to user query 传参</router-link>
    <button @click="toUser()">通过 $router 传参</button>



    <button @click="pushRoute('/aaa')">push route aaa</button>
    <button @click="pushRoute('/bbb')">push route bbb</button>



    <button @click="replaceRoute('/aaa')">replace route aaa</button>
    <button @click="replaceRoute('/bbb')">replace route bbb</button>



    <router-link to="/helloVuex" tag="button" replace active-class="active">helloVuex</router-link>



    <!-- <router-view> 是 vue-router 中注册的一个全局组件，<router-view> 相当于一个占位，渲染组件的具体位置 -->
    <!-- 
      keep-alive 是 vue 中的一个组件 
      include 属性，除了这些页面其他的页面都会缓存，其他页面不会每次都 create 和 destroy
      exclude 属性，只有这些页面会缓存，这些页面不会每次都 create 和 destroy
      只有用了 keep-alive 组件，activated 和 deactivated 钩子函数才会被执行
    -->
    <keep-alive exclude="user,bbb">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        userId: 'zhangsan'
      };
    },
    methods: {
      pushRoute(routeName) {
        this.$router.push(routeName).catch((err) => {
          err;
        });
      },
      replaceRoute(routeName) {
        this.$router.replace(routeName).catch((err) => {
          err;
        });
      },
      toUser() {
        let name = 'user';
        // let path = '/user';
        let query = { userId: 'lisi' };
        let params = { userId: 'zhangsan' };
        this.$router
          .push({
            // path,
            name,
            query,
            params // params 和 paths 不能同时存在
          })
          .catch((err) => {
            err;
          });
      }
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .active {
    color: red;
  }
</style>

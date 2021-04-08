<template>
  <div id="app">
    <!-- 
      <router-link> 是一个全局组件，
      <router-link> 默认会被渲染成 a 标签 
      tag="button" 属性，可以让 <router-link> 渲染成 button 标签
      replace 属性，是通过 history.replaceState() 去做的路由替换
      active-class="active" 属性，可以修改 <router-link> 的默认 calss 属性
    -->
    <router-link to="/aaa" tag="button" replace active-class="active">aaa</router-link>
    <router-link to="/bbb" tag="button" replace active-class="active">bbb</router-link>
    <router-link :to="'/user/' + userId" tag="button" replace active-class="active">user</router-link>

    <button @click="pushRoute('/aaa')">push route aaa</button>
    <button @click="pushRoute('/bbb')">push route bbb</button>

    <button @click="replaceRoute('/aaa')">replace route aaa</button>
    <button @click="replaceRoute('/bbb')">replace route bbb</button>

    <!-- <router-view> 是一个全局组件，<router-view> 相当于一个占位，渲染组件的具体位置 -->
    <router-view></router-view>
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

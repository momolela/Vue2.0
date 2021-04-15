import Vue from 'vue';
import App from './App';
// 导入 router 文件夹，会自动使用里面的 index.js 文件
import router from './router';
// 导入 store 文件夹，会自动使用里面的 index.js 文件
import store from './store';

Vue.config.productionTip = false;

// 所有组件都继承自 vue 的原型，所以在这里在 vue 的原型中加上新的属性，在所有的子组件中都会有该属性
// Vue.prototype.name = 'sunzj';

new Vue({
  el: '#app',
  router, // 路由
  store, // vuex
  components: { App },
  template: '<App/>'
});

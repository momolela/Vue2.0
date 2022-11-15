import Vue from 'vue';
import App from './App';
import '@/request/http'
// 导入 router 文件夹，会自动使用里面的 index.js 文件
import router from './router';
// 导入 store 文件夹，会自动使用里面的 index.js 文件
import store from './store';
import axios from './request/http'

import { Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

// 所有组件都继承自 vue 的原型，所以在这里在 vue 的原型中加上新的属性，在所有的子组件中都会有该属性
// Vue.prototype.name = 'sunzj';

Vue.prototype.$EventBus = new Vue();

Vue.prototype.$axios = axios;

Vue.use(Table);
Vue.use(TableColumn);

new Vue({
  el: '#app',
  router, // 路由
  store, // vuex
  components: { App },
  template: '<App/>'
});

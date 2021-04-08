import Vue from 'vue';
import App from './App';
// 导入 router 文件夹，会自动使用里面的 index.js 文件
import router from './router';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

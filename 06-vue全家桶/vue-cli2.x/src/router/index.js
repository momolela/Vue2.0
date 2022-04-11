import Vue from 'vue';
// 导入路由 plugin
import Router from 'vue-router';
// 导入可路由的组件
// import aaa from '@/components/aaa';
// import bbb from '@/components/bbb';
// import user from '@/components/user';

// 路由懒加载
const aaa = () => import('../components/router/aaa.vue');
const aaachild1 = () => import('../components/router/aaachild1.vue');
const aaachild2 = () => import('../components/router/aaachild2.vue');
const bbb = () => import('../components/router/bbb.vue');
const user = () => import('../components/router/user.vue');
const helloVuex = () => import('../components/vuex/helloVuex.vue');

import showpdf from '@/components/views/showpdf';
import virtualtable from '@/components/views/virtualtable';
import databind from '@/components/views/databind';
import deepclone from '@/components/views/deepclone';

// 使用导入的路由 plugin，会执行 vue-router 的 install
Vue.use(Router);

// 对外导出的这整个对象就是 vue 组件中的 $router，绑定在 vue 的原型上了
const router = new Router({
  // 这个数组里面的源数对象就是 vue 组件中的 $route，绑定在 vue 的原型上了
  routes: [
    {
      path: '/',
      // 这种写法虽然默认也能跳转到 aaa，但是 URL 上没有 aaa 的 hash
      // name: 'aaa',
      // component: aaa

      // 这种写法也能跳转到 aaa，但是 URL 上有 aaa 的 hash
      redirect: '/aaa',
      meta: {
        title: 'aaa'
      }
    },
    {
      path: '/aaa',
      name: 'aaa',
      component: aaa,
      children: [
        // 这里是路由的嵌套，说明aaa下面还有不同子模块页面的路由
        {
          path: 'aaachild1', // 这里不能用 /
          name: 'aaachild1',
          component: aaachild1
        },
        {
          path: 'aaachild2',
          name: 'aaachild2',
          component: aaachild2
        }
      ],
      meta: {
        title: 'aaa'
      }
    },
    {
      path: '/bbb',
      name: 'bbb',
      component: bbb,
      meta: {
        title: 'bbb'
      },
      beforeEnter(to, from, next) {
        // 这个是路由独享守卫，也就是路由独享钩子函数
        console.log('路由独享守卫，即将进入 bbb 路由界面');
        next();
      }
    },
    {
      // 这个的使用就是动态路由，vue 组件中通过 $route.params.userId 可以获取
      path: '/user/:userId',
      name: 'user',
      component: user,
      meta: {
        title: 'user'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      meta: {
        title: 'user'
      }
    },
    {
      path: '/helloVuex',
      name: 'helloVuex',
      component: helloVuex,
      meta: {
        title: 'helloVuex'
      }
    },
    {
      path: '/showpdf',
      name: 'showpdf',
      component: showpdf,
      meta: {
        title: 'showpdf'
      }
    },
    {
      path: '/virtualtable',
      name: 'virtualtable',
      component: virtualtable,
      meta: {
        title: 'virtualtable'
      }
    },
    {
      path: '/databind',
      name: 'databind',
      component: databind,
      meta: {
        title: 'databind'
      }
    },
    {
      path: '/deepclone',
      name: 'deepclone',
      component: deepclone,
      meta: {
        title: 'deepclone'
      }
    },
  ],

  mode: 'history', // mode: 'hash', 默认是 hash 模式，会带上 #/
  linkActiveClass: 'active' // 给所有 router-link 全局组件加上默认样式
});

// 导航守卫，前置钩子函数，跳转之前
router.beforeEach((to, from, next) => {
  console.log('全局守卫，跳转之前');
  document.title = to.matched[0].meta.title; // 为什么这里不是直接 to.meta.title，因为路由嵌套的时候，to.meta.title 为 undefined
  next(); // next() 必须要执行，不调用路由会失败
  // next('/'); // 没登录的时候跳转到首页
  // next(false); // 没登录的时候不跳转
});

// 导航守卫，后置钩子函数，跳转之后
router.afterEach((to, from) => {
  console.log('全局守卫，跳转之后');
});

export default router;

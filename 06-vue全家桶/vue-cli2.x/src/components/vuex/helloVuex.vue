<template>
  <div class="hello-vuex">
    <!-- 组件页面里可以直接使用 vuex 中的 counter 共享变量，这里要记得加上 all 模块标识，否则找不到数据 -->
    <h2>{{ $store.state.all.counter }}</h2>
    <!-- 组件页面里可以直接使用 vuex 中的经过 getters 计算过的 powerCount 共享变量，这里记得不要加上 all 模块标识，否则找不到数据 -->
    <h2>{{ $store.getters.powerCount }}</h2>
    <h2>{{ $store.getters.powerCountLength }}</h2>
    <h2>{{ $store.getters.countAdd(8) }}</h2>
    <!--  这里也可以直接修改，但是不推荐，因为这里修改跟踪不了该共享变量的改变的链路，要需要通过 mutations 修改 -->
    <button @click="$store.state.all.counter++">页面上+</button>
    <button @click="$store.state.all.counter--">页面上-</button>
    <!-- 通过 mutations 来做修改，可以通过 dev-tools 插件查看修改的链路 -->
    <button @click="increment">mutations+</button>
    <button @click="decrement">mutations-</button>
  </div>
</template>

<script>
  import { INCREMENT } from '../../store/core/mutations-type.js';
  export default {
    name: 'helloVuex',
    data() {
      return {};
    },
    methods: {
      increment() {
        // this.$store.state.all.counter++; // 这里也可以直接修改，但是不推荐，因为这里修改跟踪不了该共享变量的改变的链路，要需要通过 mutations 修改

        this.$store.commit(INCREMENT); // INCREMENT 常量名是官方推荐的做法，防止 store 里面定义，这里 commit 错，然后页面出错，所以选了常量

        // 可以传递简单参数过去
        // this.$store.commit('incrementParam', 8);

        // 下面是不同的传递参数的风格
        // let num = 8;
        // this.$store.commit({
        //   type: 'incrementParam',
        //   num,
        //   age: 8
        // });
      },
      decrement() {
        this.$store.commit('decrement');
      }
    },
    created() {},
    mounted() {
      console.log(this.$store);
    },
    destroyed() {}
  };
</script>

<style scoped></style>

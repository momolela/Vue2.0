<template>
  <div class="box">
    <div v-for="(item, index) in data" :key="index">{{item}}</div>
  </div>
</template>
 
<script>
import utils from '../../lib/utils'

const _ = require('lodash')

export default {
  name: 'deepclone',
  data() {
    return {
      data: [1, 2, 3, 4, 5]
    }
  },
  created() {
  },
  mounted() {

    // 1.Object.assign
    // 假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
    // 也就是说，如果对象的属性值为简单类型（如string， number），通过Object.assign({},srcObj);得到的新对象为深拷贝。
    // 如果属性值为对象或其它引用类型，那对于这个对象而言其实是浅拷贝的。
    // this.data[0] = 'Object.assign 深度克隆后的数据可以直接渲染'
    // this.data = Object.assign([], this.data) // 这个可以实现深度拷贝

    // 2.递归克隆
    // this.data[0] = '递归深度克隆后的数据可以直接渲染'
    // this.data = utils.clone(this.data) // 这个可以实现深度拷贝

    // 3.JSON，当属性值是 undefined 、函数或者时，JSON 对象没有办法进行克隆
    // this.data[0] = undefined
    // this.data[0] = function (a, b) {
    //   return a + b
    // }
    // this.data[0] = Symbol('deep')
    // this.data[0] = '通过JSON对象对简单对象深度克隆后的数据可以直接渲染'
    // this.data = JSON.parse(JSON.stringify(this.data)) // 这个可以实现深度拷贝

    // 4.lodash
    // this.data[0] = 'lodash 框架深度克隆后的数据可以直接渲染'
    // this.data = _.cloneDeep(this.data)

    // 5.扩展运算符的方式进行深度克隆
    this.data[0] = '扩展运算符的方式进行深度克隆后的数据可以直接渲染'
    this.data = [...this.data]

  },
  methods: {
  }
}
</script>
 
<style>
</style>
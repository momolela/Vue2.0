<template>
  <div id="contain" ref="contain" @scroll="scrollListener">
    <div id="table1" ref="table1"></div>
    <el-table ref="showTable" class="showTable" :data="tableData" height="577px" border style="width: 800px">
      <el-table-column prop="index" label="序号" width="180">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>

</template>
 
<script>
export default {
  name: 'virtualtable',
  data() {
    return {
      rowNum: 10,
      tableData: [],
      list: [],
      rowHeight: 40,
      strat: 0,
      end: 10,
    }
  },
  created() {
    for (var i = 0; i < 100; i++) {
      this.list.push({
        index: i,
        date: "周一",
        name: "zxy",
        address: "cdut"
      })
    }
    //计算滚动容器高度
    console.log(this.list);

  },
  mounted() {
    this.$refs.contain.style.height = (this.rowHeight * this.rowNum + 120) + 'px';
    this.$refs.table1.style.height = (this.rowHeight * this.list.length + 120) + 'px';
    this.$refs.contain.addEventListener("scroll", this.scrollListener);
  },
  methods: {
    showList() {
      this.tableData = this.list.slice(this.start, this.end);
    },
    scrollListener() {
      console.log("gundong");
      //获取滚动高度
      let scrollTop = this.$refs.contain.scrollTop;
      //开始的数组索引
      this.start = Math.floor(scrollTop / this.rowHeight);
      //结束索引
      this.end = this.start + this.rowNum;
      //绝对定位对相对定位的偏移量
      //this.$refs.showTable.style.top = this.start * this.rowHeight + 'px';
      this.showList();
    }
  }
}

</script>
 
<style>
#contain {
  overflow: auto;
  position: relative;
  height: 500px;
  width: 800px;
  border: 1px solid #c1c1c1;
  margin-top: 20px;
  margin-left: calc(50% + -400px);
}
#table1 {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.el-table__row {
  height: 40px;
}
.showTable {
  left: 0;
  right: 0;
  top: 0;
  position: sticky;
}
</style>
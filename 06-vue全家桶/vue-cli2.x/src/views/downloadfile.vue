<template>
  <div class="download-file">
    <p>分片下载大文件的功能实现，后端连接的是：http://127.0.0.1:8081/springboot</p>

    <button @click="getFileInfoAndDownload">点击下载大文件</button>
  </div>
</template>
<script>
import api from '../request/api'
import { saveAs } from 'file-saver'
export default {
  name: 'name',
  data() {
    return {
      byteSize: 104857600
    }
  },
  methods: {
    getFileInfoAndDownload() {
      api.apiTest.getFileInfo().then(res => {
        if (res.meta.statusCode === '200') {
          let file = {
            packageSize: res.data.packageSize
          }
          this.handleDownload(file)
        }
      })
    },
    handleDownload(file) {
      if (file) { // 判断是单文件下载还是批量下载
        this.shardToDownload(file, false)
      } else {
        this.chosenPackageList.forEach((item, index) => { // chosenPackageList 为选择需要批量下载的文件
          if (index < 3) { // 批量下载时限制同时下载最多3个
            this.shardToDownload(item, true)
          }
        })
      }
    },
    shardToDownload(item, type) {
      const total = Math.ceil(item.packageSize / this.byteSize) // 计算文件分成几片，调几次接口
      const i = 0
      item.dataStream = []
      this.$set(item, 'progress', 0)
      this.downloadFun(i, total, item, type)
    },
    downloadFun(i, total, val, type) {
      const requestHandle = async () => {
        const config = {
          headers: {
            Range: `bytes=${i * this.byteSize}-${i + 1 >= total ? val.packageSize : (i + 1) * this.byteSize}`
          }
        }
        const context = await this.fileDownload(config)
        val.dataStream.push(context)
        val.progress = Number(((++i / total) * 100).toFixed(0))
        if (i >= total) {
          this.saveFileDownload(val)
          if (type) {
            const count = this.chosenPackageList.findIndex(item => {
              return item.packageId === val.packageId
            })
            this.chosenPackageList.splice(count, 1)
            if (this.chosenPackageList.length >= 3) {
              this.shardToDownload(this.chosenPackageList[2], true)
            }
          }
        } else {
          this.$nextTick(() => {
            requestHandle()
          })
        }
      }
      requestHandle()
    },
    saveFileDownload(val) {
      const saveFile = new Blob([...val.dataStream])
      saveAs(saveFile, 'BSHIP_MDR.DMP')
      val.dataStream = []
      setTimeout(() => {
        val.progress = 0
      }, 3000)
    },
    fileDownload(config) {
      return new Promise(resolve => {
        api.apiTest.downloadFile(config).then(res => {
          resolve(res)
        })
      })
    }
  },
  computed: {
  },
  watch: {
  },
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  activated() {
  },
  deactivated() {
  },
  beforeRouteEnter(to, from, next) {
    next()
  },
  beforeRouteLeave(to, from, next) {
    next()
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
}
</script>
<style scoped>
</style>

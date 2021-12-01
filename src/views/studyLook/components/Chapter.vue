<template>
  <div class="block" style="height: 650px; overflow: auto">
    <h3 style="text-align: center">《{{book.name}}》</h3>
    <el-divider content-position="right">作者：{{book.author}}</el-divider>


    <h4>文章概述</h4>
    <p>
      {{book.brief_introduction}}
    </p>


  </div>
</template>

<script>
export default {
  name: 'Chapter',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>

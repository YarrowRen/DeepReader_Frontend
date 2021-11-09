<template>
  <el-container>
    <el-main style="text-align: center">

      <div class="filter-container" style="text-align: left;">
        <el-input placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-select placeholder="Imp" clearable style="width: 90px" class="filter-item">
          <el-option />
        </el-select>
        <el-select placeholder="Type" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
        </el-select>
        <el-select style="width: 140px" class="filter-item" @change="handleFilter">
          <el-option />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
          Search
        </el-button>
      </div>

      <div>
        <el-col v-for="(id) in this.list" :key="id" :span="6">
          <el-col :span="20">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img src="https://ywrbyimg.oss-cn-chengdu.aliyuncs.com/img/QQ%E6%88%AA%E5%9B%BE20211011181319.png" class="image">
              <div style="padding: 14px;">
                <span>《故事新编》</span>
                <el-divider content-position="right">作者：裘沙</el-divider>

                <div class="bottom clearfix">
                  <span>阅读周期：Week3-Week4<br><br></span>
                  <span>所属课程：计算机网络<br><br></span>
                  <el-link type="warning" href="/index#/exam/index">开始练习</el-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-col>

      </div>

    </el-main>
    <el-footer style="text-align: center">

      <el-pagination
        background
        layout="sizes, prev, pager, next"
        :page-sizes="[12, 16, 20, 30]"
        :page-size="pageSize"
        :total="total"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />

    </el-footer>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      list: [{
        id: 0,
        name: '',
        author: ''

      }],
      url: [
        'https://ywrbyimg.oss-cn-chengdu.aliyuncs.com/img/QQ%E6%88%AA%E5%9B%BE20211011181319.png'
      ],
      total: 0,
      currentPage: 1,
      pageSize: 12,
      pages: null,
      listLoading: true,
      currentDate: new Date()
    }
  },
  computed: {
    ...mapState('books', ['title'])
  },
  created() {
    this.getAllBookList(this.currentPage, this.pageSize)
  },
  methods: {
    ...mapActions('books', ['getBookList']),
    getAllBookList(page, pageSize) {
      console.log('test: ' + page + ' : ' + pageSize)
      this.listLoading = true
      this.getBookList({ page, pageSize }).then((response) => {
        // console.log(response)
        this.list = response.list
        this.total = response.total
        this.currentPage = response.pageNum
        this.pageSize = response.pageSize
        this.listLoading = false
      })
    },
    getPhoto() {
      var num = this.randomNum(0, 1)
      return this.url[num]
    },
    handleCurrentChange(current) {
      this.data = []
      this.currentPage = current
      this.getAllBookList(this.currentPage, this.pageSize)
    },
    handleSizeChange(size) {
      this.data = []
      this.pageSize = size
      this.getAllBookList(this.currentPage, this.pageSize)
    },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
          break
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
          break
        default:
          return 0
          break
      }
    }
  }
}
</script>

<style>

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  .el-card {
    margin-bottom: 20px;
  }
</style>

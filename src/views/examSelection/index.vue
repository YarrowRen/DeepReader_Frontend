<template>
  <el-container>
    <el-main style="text-align: center">



      <div>
        <el-col  v-for="(item, id) in this.list" :key="id" :span="6">
          <el-col :span="20">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img src="../../assets/knowledge.png" class="image">
              <div style="padding: 14px;">
                <span>《{{ item.name }}》</span>
                <el-divider content-position="right">作者：{{ item.author }}</el-divider>

                <div class="bottom clearfix">
                  <span>阅读周期：{{ formatDate(item.start_date) }}到{{ formatDate(item.end_date) }}<br><br></span>
                  <span>所属课程：{{item.classify_name}}<br><br></span>
                  <span>所属作业：{{item.work}}<br><br></span>
                  <el-link type="warning" v-if="!item.have_answer" @click="$router.push('/exam/index?bookId='+item.id)">开始练习</el-link>
                  <el-link type="success" v-if="item.have_answer" @click="$router.push('/exam/index?bookId='+item.id)" disabled>已练习</el-link>&ensp;
                  <el-link type="success" v-if="item.have_answer" @click="$router.push('/allQuestion/index?bookId='+item.id)">查看习题</el-link>
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
import * as dateUtils from '../../utils/date'
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
    ...mapActions('books', ['getUserBookList']),
    getAllBookList(page, pageSize) {
      console.log('test: ' + page + ' : ' + pageSize)
      this.listLoading = true
      this.getUserBookList({ page, pageSize }).then((response) => {
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
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return dateUtils.formatDate(date, 'yyyy-MM')
    },
  }
}
</script>

<style>

.el-aside {
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

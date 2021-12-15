<template>
  <el-container>
    <el-main style="text-align: center">


      <div>
        <!--
        <el-col :span="6">
          <el-col :span="20">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img
                src="https://ywrbyimg.oss-cn-chengdu.aliyuncs.com/img/QQ%E6%88%AA%E5%9B%BE20211011181319.png"
                class="image"
              />
              <div style="padding: 14px">
                <span>《故事新编》</span>
                <el-divider content-position="right">作者：裘沙</el-divider>

                <div class="bottom clearfix">
                  <span>阅读周期：Week3-Week4<br /><br /></span>
                  <span>所属课程：计算机网络<br /><br /></span>
                  <span
                    ><el-tag>课前阅读</el-tag>
                    <el-tag type="success">已阅读</el-tag><br /><br
                  /></span>
                  <el-link type="warning" href="/index#/study/index" disabled
                    >开始阅读</el-link
                  >&ensp;
                  <el-link type="warning" href="/index#/studyLook/index"
                    >查看文章</el-link
                  >&ensp;
                  <el-link type="warning" href="/index#/studyQuestion/index"
                    >创建测试题</el-link
                  >
                </div>
              </div>
            </el-card>
          </el-col>
        </el-col>
        -->
        <el-col v-for="(item, id) in this.list" :key="id" :span="6">
          <el-col :span="20">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img
                src="../../assets/knowledge.png"
                class="image"
              >
              <div style="padding: 14px">
                <span>《{{ item.name }}》</span>
                <el-divider
                  content-position="right"
                >作者：{{ item.author }}</el-divider>

                <div class="bottom clearfix">
                  <span> 阅读周期：{{ formatDate(item.start_date) }}到{{ formatDate(item.end_date) }}<br><br></span>
                  <span>所属课程：{{item.classify_name}}<br><br></span>
                  <span><el-tag>{{ returnStage(item.reading_stage) }}</el-tag>
                    <el-tag type="success" v-if="item.have_read">已阅读</el-tag>
                    <el-tag type="danger" v-if="!item.have_read">未阅读</el-tag>
                    <br><br>
                    </span>
                  <el-link
                    type="warning"
                    @click="$router.push('/study/index?bookId='+item.id)"
                    v-if="!item.have_read"
                  >开始阅读</el-link>&ensp;
                  <el-link
                    type="warning"
                    @click="$router.push('/study/index?bookId='+item.id)"
                    v-if="item.have_read"
                    disabled
                  >开始阅读</el-link>&ensp;
                  <el-link type="warning"  @click="viewBookAndNum(item.id)" v-if="item.have_read"
                    >查看文章</el-link
                  >&ensp;
                  <el-link type="warning" @click="$router.push('/studyQuestion/index?bookId='+item.id)" v-if="item.have_read"
                    >创建测试题</el-link
                  >
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
      list: [
        {
          id: 0,
          name: '',
          author: ''
        }
      ],
      url: [
        'https://ywrbyimg.oss-cn-chengdu.aliyuncs.com/img/QQ%E6%88%AA%E5%9B%BE20211011181319.png',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F45%2F36%2F59e52fc345cdb_610.jpg',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.kaoersi.com%2Fuploads%2Fueditor%2F20200430%2F3cfd390b7c5bb9add0c44751c9b2a4c4.jpg'
      ],
      total: 0,
      currentPage: 1,
      pageSize: 12,
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
    ...mapActions('user', ['viewBook']),
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
    viewBookAndNum(id){
      this.viewBook(id);
      this.$router.push('/studyLook/index?bookId='+id)
    },
    getPhoto() {
      var num = this.randomNum(this.url.length)
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
    randomNum( maxNum) {
      Math.round(Math.random()*maxNum) 
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return dateUtils.formatDate(date, 'yyyy-MM')
    },
    returnStage(stageId) {
      if (stageId == '0') {
        return '课前阅读'
      } else {
        return '课后阅读'
      }
    },
    returnHaveRead(have_read){
      if(have_read){
        return "已阅读"
      }else{
        return "未阅读"
      }
    },
    gotoBookPage(page){
      alert(page)
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
  clear: both;
}

.el-card {
  margin-bottom: 20px;
}
</style>

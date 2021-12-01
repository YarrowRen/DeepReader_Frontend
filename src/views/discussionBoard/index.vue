<template>
  <div id="d1">
    <el-row>
      <el-col :span="5">
        -
      </el-col>
      <el-col :span="14">
        <br>

        <el-card>
          <h3>全部讨论</h3>
          <el-divider />
          <div  >
            <el-col  v-for="(item, id) in this.showForm" :key="id" :span="24">
              <div>
                <el-tag>{{item.classifyName}}</el-tag> <el-link type="primary" :underline="false" :href="'/#/discussion/index/'+item.id">{{item.topic}}</el-link>
              </div>
              <br>
              <el-row>
                <el-col :span="16">
                  <el-link type="success">{{item.userName}}老师</el-link>
                  <el-divider direction="vertical" />
                  {{formatDate(item.createTime)}} 发表
                </el-col>
                <el-col :span="8">
                  浏览：
                  <!-- id 将作为查询条件 -->
                  <span :id="'/discussion/index/'+item.id" class="leancloud_visitors" data-flag-title="Your Article Title" >
                      <span class="leancloud-visitors-count">1000000</span>
                  </span>
                  <el-divider direction="vertical" />
                  回复：<span class="valine-comment-count" :data-xid="'/discussion/index/'+item.id"></span>
                </el-col>
              </el-row>

              <el-divider />
            </el-col>
          </div>
        </el-card>

        <br>

        <div style="text-align: center"  v-permission="['admin']">
          <el-button type="success" round @click="dialogFormVisible = true">发布讨论</el-button>
        </div>

        <div style="text-align: center">
          <el-pagination
            background
            layout="sizes, prev, pager, next"
            :page-sizes="[10]"
            :page-size="this.pageSize"
            :total="this.total"
            :current-page="this.currentPage"
            @current-change="handleCurrentChange"
          />
        </div>

       

        <div>
          <el-dialog :visible.sync="dialogFormVisible">
            <div>
              <h3 style="text-align: center">发布讨论</h3>
              <el-divider></el-divider>
            </div>
            <el-form style="height: 300px; overflow: auto" :model="discussionForm" ref="discussionForm" label-width="80px">
              <el-form-item label="讨论主题">
                <el-input v-model="discussionForm.topic"></el-input>
              </el-form-item>
              <el-form-item label="讨论内容">
                <el-input type="textarea" v-model="discussionForm.content"></el-input>
              </el-form-item>
              <el-form-item label="关联作业">
                <el-cascader
                    v-model="discussionForm.classifyId"
                    :options="discussionForm.classifyList"
                    @change="handleChange">
                  </el-cascader>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              
              <el-button
                type="success"
                @click="submitDiscussionForm"
              >提交</el-button>
              <el-button
                type="primary"
                @click="dialogFormVisible = false"
              >关闭</el-button>
            </div>
          </el-dialog>
        </div>

        

      </el-col>
    </el-row>
  </div>
</template>

<script>

// 当然你也可以为了方便使用，将它注册到全局
import permission from '@/directive/permission/index.js' // 权限判断指令
import { mapState, mapActions } from 'vuex'
import Valine from 'valine'
import * as dateUtils from '../../utils/date'
export default {
  directives: { permission },
  data() {
    return {
      pageSize: 10,

      total: 0,
      currentPage: 1,
      pages: null,
      listLoading: true,

      urlPath: '/discussion/index/故事新编',
      dialogFormVisible: false,
      discussionForm: {
        topic: "",
        content: "",
        bookList: [],
        classifyId: 0,
        classifyList: [{
          label: '',
          children:[{
            value: 0,
            label: '',
          }]
        }]
      },
      showForm: [{
        id: 0,
        userId: 0,
        classifyId: 0,
        createTime: '',
        topic: '',
        content: '',
        userName: '',
        classifyName: ''
      }]
    }
  },
  mounted() {
    let vm = this
    vm.$nextTick(()=>{
      vm.valine = new Valine({
        el: '#vcomments',
        appId: '2WRnQqrX90LVgjRRjeRYykGS-gzGzoHsz',
        appKey: 'CT68IxmlTDVY6SRzU22yyDrB',
        path: vm.$route.path,
        avatar:'mp',
        visitor: true // 阅读量统计
      })
      //console.log(vm.valine.content)
    })
  },
  created() {
    this.getClassifyList()
    this.getShowForm(this.currentPage,this.pageSize)
  },
  methods: {
    ...mapActions('books', ['getClassify']),
    ...mapActions('discussion', ['getDiscussionList','submitDiscussion']),
    getClassifyList(){
      this.getClassify().then(response => {
        //console.log(response)
        this.discussionForm.classifyList = response
      })
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return dateUtils.formatDate(date, 'yyyy/MM/dd')
    },
    getShowForm(page,pageSize){
      this.getDiscussionList(page,pageSize).then(response => {
        this.showForm = response.list
        this.total = response.total
        this.currentPage = response.pageNum
        this.pageSize = response.pageSize
        this.listLoading = false
        console.log(this.showForm)
      })
    },
    handleCurrentChange(current) {
      this.showForm = []
      this.currentPage = current
      this.getShowForm(this.currentPage, this.pageSize)
    },
    handleSizeChange(size) {
      this.showForm = []
      this.pageSize = size
      this.getShowForm(this.currentPage, this.pageSize)
    },
    handleChange(value) {
      this.discussionForm.classifyId=value[1]
      //console.log(this.discussionForm.classifyId);
    },
    submitDiscussionForm(){
      this.$confirm('是否提交该讨论？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.discussionForm.topic==null || this.discussionForm.topic==''){
          this.$message({
            type: 'warning',
            message: '主题不可以为空，请重新填写'
          })
        }else if(this.discussionForm.content==null || this.discussionForm.content==''){
          this.$message({
            type: 'warning',
            message: '内容不可以为空，请重新填写'
          })
        }else if(this.discussionForm.classifyId==0){
          this.$message({
            type: 'warning',
            message: '请选择所属作业！'
          })
        }else{
          this.submitDiscussion(this.discussionForm)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    }
  }
}

</script>

<style>
  .w-e-menu {
    z-index: 2 !important;
  }
  .w-e-text-container {
    z-index: 1 !important;
  }
</style>


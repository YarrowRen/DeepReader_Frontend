<template>
  <div id="nav" style="height: 650px;">
    <el-scrollbar style="height:100%">
      <el-row>
        <el-col :span="11">
          <div v-if="this.active!=3">
            <el-card style="height: 520px; overflow: auto">
              <h3 style="text-align: center">上传文章文件</h3>

              <el-divider><i class="el-icon-mobile-phone" /></el-divider>

              <div style="text-align: center">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :limit="1"
                  accept=".pdf"
                >
                  <i class="el-icon-upload" />
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过10mb</div>
                </el-upload>

              </div>
            </el-card>
          </div>
        </el-col>
        <el-col v-if="this.active!=3" :span="2">
          <div style="height: 520px; overflow: auto" />
        </el-col>
        <el-col v-if="this.active!=3" :span="11">

          <el-card style="height: 520px; overflow: auto">
            <h3 style="text-align: center">填写文章信息</h3>

            <el-divider><i class="el-icon-mobile-phone" /></el-divider>

            <el-form ref="bookForm" :model="this.bookForm" label-width="120px">
              <el-form-item label="文章名称">
                <el-input v-model="bookForm.bookName" />
              </el-form-item>

              <el-form-item label="文章作者">
                <el-input v-model="bookForm.author" />
              </el-form-item>

              <el-form-item label="文章简介">
                <el-input v-model="bookForm.content" type="textarea" />
              </el-form-item>

              
              <el-form-item label="阅读周期">
                <el-date-picker
                  v-model="bookForm.studyDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>

              <el-form-item label="所属课程及作业">
                <el-cascader
                placeholder="请选择课程及作业"
                v-model="bookForm.class"
                :options="options"
                @change="handleChange"></el-cascader>
              </el-form-item>

              <el-form-item label="阅读阶段">
                <el-select v-model="bookForm.stage" placeholder="请选择阅读阶段">
                  <el-option label="课前阅读" value="shanghai" />
                  <el-option label="课后阅读" value="beijing" />
                </el-select>
              </el-form-item>


            </el-form>
          </el-card>
        </el-col>
      </el-row>

      <el-divider v-if="this.active!=3" />
      <div v-if="this.active!=3" style="text-align: center">
        <el-button size="medium" type="success" @click="end">上传文章</el-button>

        <el-button
          size="medium"
          type="warning"
          @click="resetForm('bookForm')"
        >重置</el-button>
      </div>

      <div v-if="this.active==3">
        <el-card class="box-card" style="text-align: center">
          <el-button type="success" icon="el-icon-check" circle />
          <div class="text item">
            <br>
            提交成功
          </div>
        </el-card>
      </div>

    </el-scrollbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  data() {
    return {
      bookForm: {
        bookName: '',
        author: '',
        content: '',
        studyDate: '',
        class: '',
        stage: ''
      },
      content: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      dialogFormVisible: false,
      percentageNum: 0,
      choiceData: [],
      active: 0,
      questionNum: 0,
      question: '',
      dynamicValidateForm: {
        domains: [
          {
            value: '请写出文章的中心主旨，并对文章主题进行总结',
            result: ''
          }
        ],
        summary: {
          content: '',
          questionDescribe: '',
          questionClues: '',
          questionAnswer: '',
          rate: 0,
          damainList: [],
          rate: null
        }
      },
      transferProps: {
        key: 'key',
        label: 'value'
      },
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      options: [{
        value: 0,
        label: "计算机网络",
        children: [{
          value: "first",
          label: "第一次作业"
        },{
          value: "second",
          label: "第二次作业"
        },{
          value: "third",
          label: "第三次作业"
        }]
      },{
        value: 1,
        label: "操作系统",
        children: [{
          value: "first",
          label: "第一次作业"
        },{
          value: "second",
          label: "第二次作业"
        },{
          value: "third",
          label: "第三次作业"
        }]
      },{
        value: 2, 
        label: "数字电路",
        children: [{
          value: "first",
          label: "第一次作业"
        },{
          value: "second",
          label: "第二次作业"
        },{
          value: "third",
          label: "第三次作业"
        }]
      }]
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    next() {
      if (this.active == 0) {
        this.dynamicValidateForm.domains[0].value = '请写出故事新编中描写的几处核心情节',
        this.dynamicValidateForm.domains[0].result = ''
        this.active = 1
      } else if (this.active == 1) {
        this.dynamicValidateForm.domains[0].value = '请写出文章中提到的几处核心论点并给出自己的想法',
        this.dynamicValidateForm.domains[0].result = ''
        this.active = 0
      }

      if (this.percentageNum < 100) {
        this.percentageNum += 10
      } else {
        this.percentageNum = 10
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    failNextAtFirstForm() {
      this.$alert('提问不可以为空，请填写您的问题或删除部分空白问题', '跳转失败', {
        confirmButtonText: '确定'
      })
    },
    failNextAtSecondForm() {
      this.$alert('请回答您所提出的问题', '跳转失败', {
        confirmButtonText: '确定'
      })
    },
    end() {
      this.$confirm('是否确定上传文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.active = 3
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消提交'
        })
      })
    },
    handleChange(val) {
      console.log(val)
    },
    openDialog() {
      this.dialogFormVisible = true
    },
  }
}
</script>
<style>
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>


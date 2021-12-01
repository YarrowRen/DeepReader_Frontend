<template>
  <div id="nav" style="height: 650px;">
    <el-scrollbar style="height:100%">
      <el-row >
        <el-col v-if="this.active!=3" :span="6">
          -
        </el-col>
        <el-col v-if="this.active!=3" :span="12">

          <el-card style="height: 520px; overflow: auto">
            <h3 style="text-align: center">填写作业信息</h3>

            <el-divider><i class="el-icon-mobile-phone" /></el-divider>

            <el-form ref="bookForm" :model="this.bookForm" label-width="120px">
              <el-form-item label="所属课程">
                <el-input v-model="bookForm.bookName" />
              </el-form-item>

              <el-form-item label="作业名称">
                <el-input v-model="bookForm.author" />
              </el-form-item>

              <el-form-item label="授课老师">
                <el-input v-model="bookForm.content" />
              </el-form-item>

              <el-form-item label="模式选择">
                
                <el-tooltip class="item" effect="dark" content="KWL表示只使用KWL表格进行学习，KWL+Q表示学生在KWL表格的基础上还可以进行深度提问" placement="top">
                  <i class="el-icon-question" />
                </el-tooltip>
                &nbsp;
                <el-radio-group v-model="bookForm.displayMode">
                  <el-radio label="KWL"></el-radio>
                  <el-radio label="KWL+Q"></el-radio>
                </el-radio-group>
              </el-form-item>


            </el-form>
          </el-card>
        </el-col>
        <el-col v-if="this.active!=3" :span="6">
          -
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
        stage: '',
        displayMode: ''
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


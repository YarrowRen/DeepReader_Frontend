<template>
  <div id="nav" style="height: 650px">
    <el-scrollbar style="height: 100%">
      <div v-if="this.active != 3">
        <el-row>
          <el-col :span="20">
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="this.percentageNum"
              :color="customColors"
            />
          </el-col>
          <el-col :span="4">
            <div style="text-align: center">
              <p>已完成题目：{{ this.answered }}/10</p>
            </div>
          </el-col>
        </el-row>
        <el-divider />
        <el-card class="box-card">
          <div class="text item">
            接下来请您根据文章内容对以下问题进行回答，您可以随时提交您的回答并结束文章测试
          </div>
        </el-card>

        <el-divider><i class="el-icon-mobile-phone" /></el-divider>

        <div style="text-align: center">
          <el-form
            ref="dynamicValidateForm"
            :model="dynamicValidateForm"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :key="domain.key"
              :label="'问题' + ' : ' + domain.value"
              :prop="'domains.' + index + '.result'"
              :rules="{
                required: true,
                message: '提问不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="domain.result"
                type="textarea"
                :rows="2"
                placeholder="请作答"
              />
            </el-form-item>

            <el-form-item label="你觉得这个问题对阅读理解有帮助吗？" :label-width="formLabelWidth" style="text-align: left">
              <el-rate v-model="questionRate" />
            </el-form-item>
            <el-form-item v-if="this.questionRate<=3" label="请详细说明你的理由：">
              <el-input placeholder="请输入内容" />
            </el-form-item>
          </el-form>
        </div>

        <div style="text-align: center">
          <el-button
            size="medium"
            type="primary"
            @click="next"
          >下一题</el-button>
          <el-button
            size="medium"
            type="success"
            @click="end"
          >提交答案</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="openDialog"
          >查看原文</el-button>

          <el-button
            size="medium"
            type="warning"
            @click="resetForm('dynamicValidateForm')"
          >重置</el-button>
        </div>
      </div>

      <div>
        <el-dialog title="问题提示" :visible.sync="dialogFormVisible">
          <el-form style="height: 500px; overflow: auto">
            <el-form-item label="原文内容" :label-width="formLabelWidth">
              <div>
                <h3 style="text-align: center">《故事新编》</h3>
                <el-divider
                  content-position="right"
                >作者：裘沙 王伟君</el-divider>
                <el-image :src="url" style="height: 150px" />
                <p>{{ content }}</p>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              @click="dialogFormVisible = false"
            >关闭</el-button>
          </div>
        </el-dialog>
      </div>

      <div>
        <el-dialog title="问题评价" :visible.sync="evaluateVisible">
          <el-form style="height: 200px; overflow: auto">
            <el-form-item label="你觉得这个问题对阅读理解有帮助吗？" :label-width="formLabelWidth">
              <el-rate v-model="questionRate" />
            </el-form-item>
            <el-form-item v-if="this.questionRate<=3" label="请详细说明你的理由：">
              <el-input placeholder="请输入内容" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              @click="evaluateVisible = false"
            >关闭</el-button>
          </div>
        </el-dialog>
      </div>

      <div>
        <el-dialog title="问题答案" :visible.sync="answerFormVisible">
          <el-form style="height: 500px; overflow: auto">
            <el-form-item
              v-for="(question, index) in questionForm"
              :key="question.key"
              :label-width="formLabelWidth"
              :prop="'knows.' + index + '.value'"
            >
              <el-card>
                <div>{{ question.question }}</div>
                <el-divider />
                <div>参考答案：{{ question.answer }}</div>
                <div>你的答案：{{ question.yourAnswer }}</div>
              </el-card>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              @click="answerFormVisible = false"
            >关闭</el-button>
          </div>
        </el-dialog>
      </div>

      <div v-if="this.active == 3">
        <el-card class="box-card" style="text-align: center">
          <el-button type="success" icon="el-icon-check" circle />
          <div class="text item">
            <br>
            提交成功
          </div>
        </el-card>
        <br>
        <div style="text-align: center">
          <el-button
            size="medium"
            type="success"
            @click="showAnswer"
          >查看答案</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="backToSelect"
          >返回选择界面</el-button>
        </div>
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
          name: ''
        }
      }
    }
  },
  data() {
    return {
      evaluateVisible: false,
      questionRate: 5,
      answered: 0,
      questionNum: 0,
      content: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      dialogFormVisible: false,
      answerFormVisible: false,
      percentageNum: 0,
      choiceData: [],
      active: 0,
      question: '',
      questionForm: [
        {
          question: '请写出文章的中心主旨，并对文章主题进行总结',
          answer: '是作者在文章中要表达的贯穿全文的核心，是提纲挈领的道理，是作者在文章中努力通过各种细节来阐明的中心议题。作者要告诉我们的道理和内涵。',
          yourAnswer: '主要的意义，用意或目的'
        },
        {
          question: '请写出文章中提到的几处核心论点并给出自己的想法',
          answer: '人的伟大之所以为伟大，就在于他认识自己可悲。一棵树并不认识自己可悲。',
          yourAnswer: '人是根能思想的苇草'
        },
        {
          question: '请写出故事新编中描写的几处核心情节',
          answer: '回答2',
          yourAnswer: '我的回答2'
        }
      ],
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
      ]
    }
  },
  computed: {
    ...mapState('user', ['name']),
    ...mapState('books', ['title'])
  },
  created() {
    this.getContent()
  },
  methods: {
    ...mapActions('user', ['updateStuInfo']),
    next() {
      if (this.active == 0) {
        (this.dynamicValidateForm.domains[0].value =
          '请写出故事新编中描写的几处核心情节'),
        (this.dynamicValidateForm.domains[0].result = '')
        this.active = 1
      } else if (this.active == 1) {
        (this.dynamicValidateForm.domains[0].value =
          '请写出文章中提到的几处核心论点并给出自己的想法'),
        (this.dynamicValidateForm.domains[0].result = '')
        this.active = 0
      }

      if (this.percentageNum < 100) {
        this.percentageNum += 10
        this.answered++
      } else {
        this.percentageNum = 0
        this.answered = 0
      }
      this.questionRate = 5
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
      this.$alert(
        '提问不可以为空，请填写您的问题或删除部分空白问题',
        '跳转失败',
        {
          confirmButtonText: '确定'
        }
      )
    },
    failNextAtSecondForm() {
      this.$alert('请回答您所提出的问题', '跳转失败', {
        confirmButtonText: '确定'
      })
    },
    end() {
      this.$confirm('是否结束答题并提交当前答案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.active = 3
        })
        .catch(() => {
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
    showAnswer() {
      this.answerFormVisible = true
    },
    ...mapActions('books', ['getBookContent']),
    getContent() {
      this.getBookContent('1000517').then((response) => {
        this.content = response
      })
    },
    backToSelect() {

    }
  }
}
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>


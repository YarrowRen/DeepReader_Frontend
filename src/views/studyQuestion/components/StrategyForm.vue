<template>
  <div id="nav" style="height: 650px;">
    <el-scrollbar style="height:100%">

      <el-card v-if="active == 0" class="box-card">
        <div class="text item">
          读完此文，请创建测试题，考考你的同伴，主要目的在于检验学习者对文章主要内容、主题思想的理解，问题的答案在文章可以找到。
        </div>
      </el-card>

      <el-card v-if="active == 1" class="box-card" style="text-align: center">
        <el-button type="success" icon="el-icon-check" circle />
        <div class="text item">
          <br>
          提交成功
        </div>
      </el-card>

      <el-divider><i class="el-icon-star-off" /></el-divider>

      <div style="text-align: center">

        <el-form
          v-if="active == 0"
          style="text-align: left"
          class="demo-dynamic"
        >
          <el-form-item label="问题类型">
            <el-select v-model="questionForm.questionType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="问题">
            <el-tooltip class="item" effect="dark" content="请输入您为其他提出的问题" placement="top">
              <i class="el-icon-question" />
            </el-tooltip>
            <el-input
              v-model="questionForm.questionDescribe"
              placeholder="请输入向其他同学提出的问题"
            />
          </el-form-item>

          <el-form-item label="问题答案">
            <el-input
              v-model="questionForm.questionAnswer"
              placeholder="请给出该问题的答案"
            />
          </el-form-item>

          <el-form-item label="问题线索">
            <el-tooltip class="item" effect="dark" content="文中主要的文本片段，可以暗示答案的问题答案（您的问题来源于文中的哪些关键句？）" placement="top">
              <i class="el-icon-question" />
            </el-tooltip>
            <el-input
              v-model="questionForm.questionClues"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请给出其他同学查找该问题答案的线索"
            />
          </el-form-item>

          <el-form-item label="请求小机器人的帮助">
            <el-tooltip class="item" effect="dark" content="小机器人正处于学习初级阶段，希望得到你的帮助提高问题质量。" placement="top">
              <i class="el-icon-question" />
            </el-tooltip>
            <br>
            
            <el-image
              style="width: 100px; height: 100px"
              :src="require('../../../assets/robot.jpg')"
              :fit="fit"
              @click="robotHelp"
              v-loading.fullscreen.lock="fullscreenLoading"
            />
          </el-form-item>
        </el-form>

      </div>

      <div v-if="this.active==0">
        <el-dialog title="小机器人正处于学习初级阶段，希望得到你的帮助提高问题质量" :visible.sync="dialogFormVisible">
          <el-row>
            <el-col :span="18">
              <el-form>
                <el-form-item label="小机器人提问" :label-width="formLabelWidth">
                  <p>“机器人提问内容”</p>
                </el-form-item>
                <el-form-item label="你的提问" :label-width="formLabelWidth">
                  <p>{{ this.questionForm.questionDescribe }}</p>
                </el-form-item>
                <el-form-item label="对比你提出的问题，你觉得小机器人提出的问题对你有帮助吗？">
                  <el-rate v-model="questionForm.robotRate" />
                </el-form-item>
                <el-form-item v-if="this.questionForm.robotRate<=3" label="请改进小机器人提出的问题">
                  <el-input 
                  v-model="questionForm.modifyQuestion"
                  placeholder="请输入内容" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">提交</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <el-image
              style="width: 100px; "
              :src="require('../../../assets/robotHelp.png')"
              :fit="fit"></el-image>
            </el-col>
          </el-row>
        </el-dialog>
      </div>

      <div style="text-align: center">
        <el-button v-if="active == 1" size="medium" type="success" @click="createQuestion">继续创建测试题</el-button>
        <el-button v-if="active != 0" size="medium" type="primary" @click="next">返回</el-button>

        <el-button v-if="active == 0" size="medium" type="success" @click="next">提交问题</el-button>
      </div>

    </el-scrollbar>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      questionType: '',
      newData: '新数据',
      url: 'https://ywrbyimg.oss-cn-chengdu.aliyuncs.com/img/src=http___img.zcool.cn_community_01dcd75af39d3ba8012160456172c4.jpg@1280w_1l_2o_100sh.jpg&refer=http___img.zcool.jpg',
      choiceData: [],
      active: 0,
      dialogFormVisible: false,
      haveSubmit: true,
      fullscreenLoading: false,
      questionNum: 0,
      questionForm: {
        bookId: '',
        robotRate: 5,
        modifyQuestion: '',
        questionType: '',
        questionDescribe: '',
        questionClues: '',
        questionAnswer: '',
      },
      transferProps: {
        key: 'key',
        label: 'value'
      },
      options: [{
        value: '1',
        label: '时间'
      }, {
        value: '2',
        label: '谁'
      }, {
        value: '3',
        label: '为什么'
      }, {
        value: '4',
        label: '怎么样'
      }, {
        value: '5',
        label: '什么'
      }, {
        value: '6',
        label: '哪些'
      }, {
        value: '7',
        label: '哪里'
      }, {
        value: '8',
        label: '哪个'
      }, {
        value: '9',
        label: '数字'
      }]
    }
  },
  computed: {
    ...mapState('user', ['name'])
  },
  methods: {
    ...mapActions('user', ['updateStuInfo','updateUserKWLForm','updateQuestionForm']),
    next() {
      // if (this.active++ > 2) this.active = 0;
      // console.log(this.dynamicValidateForm.domains[0].value);
      // console.log(this.dynamicValidateForm.domains[0].result);
      if (this.active == 0) {
        this.submit()
      } else {
        this.active = 0
        this.$emit('active', this.active)
        this.$emit('back')
        this.$router.push('/bookSelection/index');
      }
    },
    back() {
      this.active--
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
    resetQuestionForm(){
        alert("清空表单")
        this.questionForm.robotRate=5
        this.questionForm.modifyQuestion=""
        this.questionForm.questionType=""
        this.questionForm.questionDescribe=""
        this.questionForm.questionClues=""
        this.questionForm.questionAnswer=""
    },
    submit() {
      this.$confirm('是否结束文章阅读并提交！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.active++
        this.questionForm.bookId=this.book.id
        this.updateQuestionForm(this.questionForm)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    handleChange(val) {
      console.log(val)
    },
    robotHelp() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.dialogFormVisible = true
      }, 3000);
    },
    toParent: function() {
      this.$emit('greet')
    },
    createQuestion() {
      this.active = 0
      this.$emit('requestion')
      this.resetQuestionForm()
    }
  }
}
</script>
<style>
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>


<template>
  <div id="nav" style="height: 650px;">
    <el-scrollbar v-if="!showContent" style="height:100%">

      <el-card v-if="active == 0" class="box-card" style="text-align: center">
        <div class="text item">
          在精读文章之前，关于这个主题，你能联想到曾经学过的哪些知识？
        </div>
      </el-card>

      <el-card v-if="active == 1" class="box-card">
        <div class="text item">
          请精读左侧文章，精读完成后，根据文章内容，在下方回答您之前提出的问题
        </div>
      </el-card>

      <el-card v-if="active == 3" class="box-card">
        <div class="text item">
          读完此文，请创建测试题，考考你的同伴，主要目的在于检验学习者对文章主要内容、主题思想的理解，问题的答案在文章可以找到。
        </div>
      </el-card>

      <el-card v-if="active == 4" class="box-card" style="text-align: center">
        <el-button type="success" icon="el-icon-check" circle />
        <div class="text item">
          <br>
          提交成功
        </div>
      </el-card>

      <el-divider><i class="el-icon-notebook-2" /></el-divider>

      <div style="text-align: center">
        <el-form
          v-if="active == 0"
          ref="dynamicValidateForm"
          :model="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(know, index) in dynamicValidateForm.knows"
            :key="know.key"
            :label="'已知' + (index+1)"
            :prop="'knows.' + index + '.value'"
            :rules="{
              required: true,
              message: '不可为空！',
              trigger: 'blur',
            }"
          >
            <el-col :span="20">
              <el-input
                v-model="know.value"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
            </el-col>
            <el-button
              type="danger"
              @click.prevent="removeKnow(know)"
              icon="el-icon-delete" circle
            ></el-button>
          </el-form-item>

          <el-button
            v-if="active == 0"
            size="medium"
            type="success"
            @click="addKnow"
            icon="el-icon-plus" circle
          ></el-button>

          <el-divider><i class="el-icon-notebook-2" /></el-divider>

          <el-card class="box-card">
            <div class="text item">
              关于这个主题，你存在哪些疑惑？你将带着这个疑惑去精度这个文章。
            </div>
          </el-card>
          <br>

          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.doubts"
            :key="domain.key"
            :label="'问题' + (index+1)"
            :prop="'doubts.' + index + '.value'"
            :rules="{
              required: true,
              message: '提问不能为空',
              trigger: 'blur',
            }"
          >
            <el-col :span="20">
              <el-input v-model="domain.value" />
            </el-col>
            <el-button
              type="danger"
              @click.prevent="removeDomain(domain)"
              icon="el-icon-delete" circle
            ></el-button>
          </el-form-item>

          <el-button
            v-if="active == 0"
            size="medium"
            type="success"
            @click="addDomain"
            icon="el-icon-plus" circle
          ></el-button>

          <el-divider><i class="el-icon-notebook-2" /></el-divider>

        </el-form>

        <el-form
          v-if="active == 1"
          ref="dynamicValidateForm"
          :model="dynamicValidateForm"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.doubts"
            :key="domain.key"
            :label="'问题' + (index+1) + ' : ' + domain.value"
            :prop="'doubts.' + index + '.result'"
            :rules="{
              required: true,
              message: '提问不能为空',
              trigger: 'blur',
            }"
          >
            <el-input v-model="domain.result" />
          </el-form-item>
        </el-form>

        <el-form
          v-if="active == 3"
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

      <div v-if="this.active==3">
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
        <el-button v-if="active == 4" size="medium" type="success" @click="createQuestion">继续创建测试题</el-button>
        <el-button v-if="active == 4" size="medium" type="primary" @click="next">返回</el-button>

        <el-button v-if="active != 3 && active != 4" size="medium" type="primary" @click="next">下一步</el-button>

        <el-button v-if="active == 3" size="medium" type="success" @click="next">提交问题</el-button>

        <!--<el-button @click="back" size="medium" type="warning" v-if="active == 2">返回上一步</el-button>-->
        
        <el-button
          v-if="active == 0"
          size="medium"
          type="warning"
          @click="resetForm('dynamicValidateForm')"
        >重置</el-button>
      </div>

      <div v-if="active==1" style="text-align: center">
        <h4>阅读时间：{{ this.timeData }}</h4>
      </div>
    </el-scrollbar>

    <el-scrollbar v-if="showContent" style="height:100%">
      <el-row :gutter="20">
        <el-col :span="7" :xs="24">
          <el-card style="height: 600px; overflow: auto">
            <div style="text-align:center">
              <h3 style="background-color: rgba( 203,27,69,0.2 );">在读《故事新编》之前， 我已经知道了以下知识</h3>
            </div>
            <el-divider><i class="el-icon-notebook-2" /></el-divider>
            <el-timeline :reverse="true">
              <el-timeline-item
                v-for="(know, index) in this.dynamicValidateForm.knows"
                :key="index"
              >
                {{ know.value }}
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
        <el-col :span="7" :xs="24">
          <el-card style="height: 600px; overflow: auto">
            <div style="text-align:center">
              <h3 style="background-color: rgba( 67,52,27,0.2 );">我带着疑问去精读，解决了如下疑惑</h3>
            </div>
            <el-divider><i class="el-icon-notebook-2" /></el-divider>
            <el-card v-for="(domain, index) in dynamicValidateForm.doubts" :key="index" :value="domain" :title="domain.value" style="margin-bottom: 20px">
              <div>问题：{{ domain.value }}</div>
              <el-divider />
              <div>答案：{{ domain.result }}</div>
            </el-card>
          </el-card>
        </el-col>
        <el-col :span="10" :xs="24">
          <el-card style="height: 600px; overflow: auto">

            <div style="text-align:center">
              <h3 style="background-color: rgba( 27,129,62,0.2 );">读完《故事新编》之后，我的学习收获如下</h3>
            </div>
            <el-divider><i class="el-icon-notebook-2" /></el-divider>

            <!-- <el-card v-if="active == 2" class="box-card">
              <div class="text item">
                请用自己的语言，概括本文章的主要内容
              </div>
            </el-card> -->

            <el-divider v-if="active!=2"><i class="el-icon-star-off"/></el-divider>

            <div style="text-align: center">
              <el-form
                style="text-align: left"
                class="demo-dynamic"
              >

                <el-form-item label="请用自己的语言，概括本文章的主要内容">
                  <el-input
                    v-model="dynamicValidateForm.summary.content"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    placeholder="请写下阅读后对文章的概括"
                  />
                </el-form-item>

                <el-form-item label="你喜欢这篇文章吗？请为其打分">
                  <el-rate v-model="dynamicValidateForm.summary.rate" />
                </el-form-item>

              </el-form>
            </div>

            <div style="text-align: center">
              <el-button v-if="active != 3" size="medium" type="primary" @click="next">下一步</el-button>

              <el-button v-if="active == 3" size="medium" type="success" @click="next">提交问题</el-button>

              <el-button v-if="active == 2" size="medium" type="warning" @click="back">返回上一步</el-button>
              <el-button
                v-if="active == 0"
                size="medium"
                type="primary"
                @click="addDomain"
              >新增问题</el-button>
              <el-button
                v-if="active == 0"
                size="medium"
                type="primary"
                @click="addKnow"
              >新增已知</el-button>
              <el-button
                v-if="active == 0"
                size="medium"
                type="warning"
                @click="resetForm('dynamicValidateForm')"
              >重置</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
      fit: "scale-down",
      haveSubmit: false,
      showContent: false,
      url: 'https://ywrbyimg.oss-cn-chengdu.aliyuncs.com/img/src=http___img.zcool.cn_community_01dcd75af39d3ba8012160456172c4.jpg@1280w_1l_2o_100sh.jpg&refer=http___img.zcool.jpg',
      choiceData: [],
      active: 0,
      dialogFormVisible: false,
      questionNum: 0,
      fullscreenLoading: false,
      dynamicValidateForm: {
        bookId: "",
        time: 0,
        knows: [
          {
            value: ''
          }
        ],
        doubts: [
          {
            value: '',
            result: ''
          }
        ],
        summary: {
          content: '',
          rate: 0
        }
      },
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
        value: '时间',
        label: '时间'
      }, {
        value: '谁',
        label: '谁'
      }, {
        value: '为什么',
        label: '为什么'
      }, {
        value: '怎么样',
        label: '怎么样'
      }, {
        value: '什么',
        label: '什么'
      }, {
        value: '哪些',
        label: '哪些'
      }, {
        value: '哪里',
        label: '哪里'
      }, {
        value: '哪个',
        label: '哪个'
      }, {
        value: '数字',
        label: '数字'
      }],
      timeData: '',
      readTime: 0,
      timer: 0
    }
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('user', ['name'])
  },
  methods: {
    ...mapActions('user', ['updateStuInfo','updateUserKWLForm','updateQuestionForm']),
    next() {
      this.timeCount()
      // if (this.active++ > 2) this.active = 0;
      // console.log(this.dynamicValidateForm.doubts[0].value);
      // console.log(this.dynamicValidateForm.doubts[0].result);
      if (this.active == 0) {
        var result = true
        for (var i = 0; i < this.dynamicValidateForm.doubts.length; i++) {
          var val = this.dynamicValidateForm.doubts[i].value
          if (val == '' || val == null) {
            this.failNextAtFirstForm()
            result = false
            break
          }
        }
        for (var i = 0; i < this.dynamicValidateForm.knows.length; i++) {
          var val = this.dynamicValidateForm.knows[i].value
          if (val == '' || val == null) {
            this.failNextAtFirstForm()
            result = false
            break
          }
        }
        if (result) {
          this.submitQuestion()
        }
      } else if (this.active == 1) {
        var result = true
        for (var i = 0; i < this.dynamicValidateForm.doubts.length; i++) {
          console.log(this.dynamicValidateForm.doubts[i])
          var val = this.dynamicValidateForm.doubts[i].result
          if (val == '' || val == null) {
            this.failNextAtSecondForm()
            result = false
            break
          }
        }
        if (result) {
          this.dynamicValidateForm.time=this.readTime
          this.active++
          this.showContent = true
          this.$emit('active', this.active)
          this.$emit('close')
        }
      } else if (this.active == 2) {
        this.active++
        this.$emit('active', this.active)
        this.$emit('open')
        this.showContent = false
      } else if (this.active == 3) {
        /*
        if (questionClues == '' || questionAnswer == '') {
          this.failSubimit()
        }else{
          this.submit()
        }
        */
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.doubts.indexOf(item)
      var num = this.dynamicValidateForm.doubts.length
      if (index !== -1 && num > 1) {
        this.dynamicValidateForm.doubts.splice(index, 1)
      }
      if (num == 1) {
        this.failDelete()
      }
    },
    removeKnow(item) {
      var index = this.dynamicValidateForm.knows.indexOf(item)
      var num = this.dynamicValidateForm.knows.length
      if (index !== -1 && num > 1) {
        this.dynamicValidateForm.knows.splice(index, 1)
      }
      if (num == 1) {
        this.failDelete()
      }
    },
    addDomain() {
      var num = this.dynamicValidateForm.doubts.length
      if (num >= 5) {
        this.failAdd()
      }
      if (num < 5) {
        this.dynamicValidateForm.doubts.push({
          value: '',
          key: Date.now()
        })
      }
    },
    addKnow() {
      var num = this.dynamicValidateForm.knows.length
      if (num >= 5) {
        this.failAdd()
      }
      if (num < 5) {
        this.dynamicValidateForm.knows.push({
          value: '',
          key: Date.now()
        })
      }
    },
    failDelete() {
      this.$alert('请至少提出一个问题或已知', '删除失败', {
        confirmButtonText: '确定',
        callback: (action) => {
          this.$message({
            type: 'info',
            message: `action: 禁止删除`
          })
        }
      })
    },
    failAdd() {
      this.$alert('至多提出五个问题或已知', '增加失败', {
        confirmButtonText: '确定',
        callback: (action) => {
          this.$message({
            type: 'info',
            message: `action: 禁止增加`
          })
        }
      })
    },
    failSubimit(){
      this.$alert('问题内容，问题答案和不可以为空，请重新填写', '提交失败', {
        confirmButtonText: '确定'
      })
    },
    failNextAtFirstForm() {
      this.$alert('提问或已知不可以为空，请填写您的问题或删除部分空白问题', '跳转失败', {
        confirmButtonText: '确定'
      })
    },
    failNextAtSecondForm() {
      this.$alert('请回答您所提出的问题', '跳转失败', {
        confirmButtonText: '确定'
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
        this.$emit('active', this.active)
        if(this.haveSubmit){
          this.questionForm.bookId=this.book.id
          this.updateQuestionForm(this.questionForm)
        }else{
          this.dynamicValidateForm.bookId=this.book.id
          this.questionForm.bookId=this.book.id
          this.updateUserKWLForm(this.dynamicValidateForm)
          this.updateQuestionForm(this.questionForm)
          this.haveSubmit=true
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    submitQuestion() {
      this.$confirm('是否结束泛读，进入精读阶段?（您将不能重新修改问题）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.active++
        this.$emit('active', this.active)
        this.$emit('next')
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
    timeCount() {
      // 会议计时
      let tempTime = 0
      let second = 0
      let minute = 0
      this.timeData = ''
      if (this.active == 0) {
        this.timer = setInterval(() => {
          tempTime += 1
          minute = parseInt(tempTime % 3600 / 60) // 转分钟
          second = parseInt(tempTime % 3600 % 60) // 转秒
          // 格式化
          minute = (minute > 9 ? minute : '0' + minute) + ''
          second = (second > 9 ? second : '0' + second) + ''

          this.timeData = minute + ':' + second
          this.readTime=parseInt(minute)*60+parseInt(second)
        }, 1000)
      } else {
        window.clearInterval(this.timer)
      }
    },
    createQuestion() {
      this.active = 3
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


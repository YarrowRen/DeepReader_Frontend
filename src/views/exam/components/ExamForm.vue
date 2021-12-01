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
              <p>已完成题目：{{ this.answered }}/{{this.questionForm.length}}</p>
            </div>
          </el-col>
        </el-row>
        <el-divider />
        <el-card class="box-card">
          <div class="text item">
            接下来请您根据文章内容对以下问题进行回答，您可以随时点击提交答案
          </div>
        </el-card>

        <el-divider><i class="el-icon-mobile-phone" /></el-divider>

        <div style="text-align: center">
          <el-form
            ref="questionForm"
            class="demo-dynamic"
          >
            <div
              v-for="(questionList, index) in questionForm"
              :key="questionList.key"
            >
              <div  v-if="index==questionIndex"> 
                <el-form-item
                  :label="'问题' + ' : ' + questionList.question" 
                  :rules="{
                    required: true,
                    message: '提问不能为空',
                  }"
                >
                  <el-input
                    v-model="questionList.yourAnswer"
                    type="textarea"
                    :rows="2"
                    placeholder="请作答"
                  />
                </el-form-item>
                <el-form-item label="你觉得这个问题对阅读理解有帮助吗？" :label-width="formLabelWidth" style="text-align: left" >
                  <el-rate
                   @change="changeRate"
                   v-model="questionList.yourRate" />
                </el-form-item>
                <el-form-item v-if="questionList.yourRate<=3" label="请详细说明你的理由：" >
                  <el-input placeholder="请输入内容"  v-model="questionList.opinion"/>
                </el-form-item>
              </div>
            </div>
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
        </div>
      </div>

      <div>
        <el-dialog title="原文" :visible.sync="dialogFormVisible">
          <el-form style="height: 500px; overflow: auto">
            <el-form-item :label-width="formLabelWidth">
              <div>
                <h3 style="text-align: center">《{{book.name}}》</h3>
                <el-divider
                  content-position="right"
                >作者：{{book.author}}</el-divider>
                <div style="text-align: center">
                  <el-button @click="scalBig" type="success">放大</el-button>
                  <el-button @click="scalSmall" type="primary">缩小</el-button>
                </div>
                <div class="drag-box" id="dragBox" style="text-align: center">
                  <el-scrollbar style="height:100%;" id="scrollbar">
                    <div class="wrapper" id="pdf-container" >
                      <div
                        v-for="page in pdfPages"
                        :id="`page-${page}`"
                        :key="page"
                        class="pdf-box"
                      >
                        <canvas :key="page" :id="'pdfCanvas' + page" class="bookCanvas"></canvas>
                      </div>
                    </div>
                  </el-scrollbar>
                </div>
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
        <el-dialog title="问题答案" :visible.sync="answerFormVisible">
          <el-form style="height: 500px; overflow: auto">
            <el-form-item
              v-for="(question, index) in questionForm"
              :key="question.key"
              :label-width="formLabelWidth"
              :prop="'question.' + index + '.value'"
            >
              <el-card>
                <div>{{ question.question }}</div>
                <el-divider />
                <div>参考答案：{{ question.answer }}</div>
                <div v-if="question.yourAnswer==null || question.yourAnswer==''">未作答</div>
                <div v-if="question.yourAnswer!=null && question.yourAnswer!=''"> 你的答案：{{ question.yourAnswer }}</div>
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
            @click="backExamSelection"
          >返回选择界面</el-button>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const PDFJS = require("pdfjs-dist");
import { TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";
PDFJS.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js";

export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      questionIndex: 0,
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
          id: '',
          question: '',
          answer: '',
          yourAnswer: '',
          type: '',
          clues: '',
          robotQuestion: '',
          rate: '',
          modifyQuestion: '',
          userId: '',
          bookId: '',
          yourRate: 5,
          opinion: ''
        }
      ],
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
      
      pdfPages: [], // 页数
      pdfWidth: "", // 宽度
      pdfSrc: "", // 地址
      pdfDoc: "", // 文档内容
      pdfScale: 1.4, // 放大倍数
    }
  },
  mounted() {
    this.getPdfUrl();
  },
  computed: {
    ...mapState('user', ['name'])
  },
  created() {
    
    // console.log("0:"+this.book.bookId) viewBookAtExam
    this.getQuestionForm(this.book.bookId)
    
  },
  methods: {
    ...mapActions('user', ['getQuestionFormByBookId','submitAnswer','viewBookAtExam']),
    getQuestionForm(bookId){
      
      console.log("1:"+bookId)
      this.getQuestionFormByBookId(bookId).then(response => {
        this.questionForm = response
        for(var i=0;i<this.questionForm.length;i++){
          this.questionForm[i].yourRate=5
        }
      })
      
      
    },
    changeRate() {
      this.$forceUpdate();
    },
    backExamSelection(){
      this.$router.push('/examSelection/index');
    },
    failNextQuestion() {
      this.$alert('回答不可以为空，请认真回答问题！', '失败', {
        confirmButtonText: '确定'
      })
    },
    next() {
      if(this.questionIndex<this.questionForm.length-1){
        if(this.questionForm[this.questionIndex].yourAnswer==null || this.questionForm[this.questionIndex].yourAnswer==''){
          this.failNextQuestion()
        }else{
          this.nextQuestion()
        }
      }else{
        if(this.questionForm[this.questionIndex].yourAnswer==null || this.questionForm[this.questionIndex].yourAnswer==''){
          this.failNextQuestion()
        }else{
          this.percentageNum=100
          this.answered=this.questionForm.length
          this.noQuestion()
        }
      }
      this.questionRate = 5
    },
    noQuestion(){
      this.$confirm('已经没有其他问题了，是否结束答题并提交当前答案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var form=this.questionForm[this.questionIndex]
          var answerForm={
            'bookId': form.bookId,
            'questionId': form.id,
            'answer': form.yourAnswer,
            'rate': form.yourRate,
            'opinion': form.opinion
          }
          this.submitAnswer(answerForm)
          this.active = 3
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          })
        })
    },
    nextQuestion(){
      this.$confirm('是否提交该题答案并继续回答下一题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var form=this.questionForm[this.questionIndex]
          var answerForm={
            'bookId': form.bookId,
            'questionId': form.id,
            'answer': form.yourAnswer,
            'rate': form.yourRate,
            'opinion': form.opinion
          }
          this.submitAnswer(answerForm)
          this.questionIndex++
          this.percentageNum=Math.round((this.questionIndex/this.questionForm.length)*100)
          this.answered++
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          })
        })
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
    end() {
      if(this.questionForm[this.questionIndex].yourAnswer==null || this.questionForm[this.questionIndex].yourAnswer==''){
        this.failNextQuestion()
      }else{
        this.$confirm('是否结束答题并提交当前答案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          var form=this.questionForm[this.questionIndex]
          var answerForm={
            'bookId': form.bookId,
            'questionId': form.id,
            'answer': form.yourAnswer,
            'rate': form.yourRate,
            'opinion': form.opinion
          }
          this.submitAnswer(answerForm)
          this.active = 3
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          })
        })
      }
    },
    handleChange(val) {
      console.log(val)
    },
    openDialog() {
      this.dialogFormVisible = true
      this.getPdfUrl()
      this.viewBookAtExam(this.book.id)
    },
    showAnswer() {
      this.answerFormVisible = true
    },
    



    getPdfUrl() {
      // todo 请求后台，获取pdf的url，这里用的是线上的地址
      this.pdfSrc =
        "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";
      this.loadFile(this.pdfSrc);
    },
    loadFile(url) {
      let loadingTask = PDFJS.getDocument(url);
      loadingTask.promise.then((pdf) => {
        this.pdfDoc = pdf;
        this.pdfPages = pdf.numPages;
        this.$nextTick(() => {
          this.renderPage(1);
        });
      });
    },
    renderPage(num) {
      const that = this;
      this.pdfDoc.getPage(num).then((page) => {
        let pageDiv = document.getElementById(`page-${num}`);
        let canvas = document.getElementById("pdfCanvas" + num);
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        let viewport = page.getViewport({ scale: this.pdfScale });
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;

        canvas.style.width = viewport.width + "px";

        that.pdfWidth = viewport.width + "px";

        canvas.style.height = viewport.height + "px";

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        // 将 PDF 页面渲染到 canvas 上下文中
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        page
          .render(renderContext)
          .promise.then(() => {
            return page.getTextContent();
          })
          .then((textContent) => {
            // 创建文本图层div
            const textLayerDiv = document.createElement("div");
            textLayerDiv.setAttribute("class", "textLayer");
            
            textLayerDiv.setAttribute("style", " overflow: auto;");
            // 将文本图层div添加至每页pdf的div中
            pageDiv.appendChild(textLayerDiv);
            // 创建新的TextLayerBuilder实例
            let textLayer = new TextLayerBuilder({
              textLayerDiv: textLayerDiv,
              pageIndex: page.pageIndex,
              viewport: viewport,
            });
            textLayer.setTextContent(textContent);
            textLayer.render();
          });
        if (this.pdfPages > num) {
          this.renderPage(num + 1);
        }
      });
    },
    // 放大
    scalBig() {
      this.pdfScale = this.pdfScale + 0.1;
      this.getPdfUrl()
      var o=document.getElementById("pdfCanvas1");
　　  var w=o.offsetWidth;
      document.getElementById("scrollbar").style.width=w+"px"
      //alert(w+" : "+document.getElementById("scrollbar").offsetWidth)
    },
    // 缩小
    scalSmall() {
      if (this.pdfScale > 1.4) {
        this.pdfScale = this.pdfScale - 0.1;
        this.getPdfUrl()
        var o=document.getElementById("pdfCanvas1");
  　　  var w=o.offsetWidth;
        document.getElementById("scrollbar").style.width=w+"px"
      }else{
        this.$message({
          type: 'info',
          message: `action: 无法继续缩小`
        })
      }
    },
  }
}
</script>
<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
}

.preview-pdf {
  h1 {
    margin: 30px auto;
    text-align: center;
    font-family: "宋体";
    letter-spacing: 2px;
  }
}


</style>





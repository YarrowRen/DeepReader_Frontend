<template>
  <div class="block" style="height: 650px; overflow: auto">
    <div>
      <h3 style="text-align: center">《{{ book.name }}》</h3>
      <el-divider content-position="right">作者：{{ book.author }}</el-divider>

      <div style="text-align: center">
        <el-button @click="scalBig" type="success">放大</el-button>
        <el-button @click="scalSmall" type="primary">缩小</el-button>
      </div>
      <div class="drag-box" id="dragBox" >
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const PDFJS = require("pdfjs-dist");
import { TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";
PDFJS.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js";

// console.log("成功：",PDFJS )
export default {
  data() {
    return {
      content: "",
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      pdfPages: [], // 页数
      pdfWidth: "", // 宽度
      pdfSrc: "", // 地址
      pdfDoc: "", // 文档内容
      pdfScale: 1.4, // 放大倍数
    };
  },
  mounted() {
    this.getPdfUrl();
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getPdfUrl() {
      // todo 请求后台，获取pdf的url，这里用的是线上的地址
      this.pdfSrc =this.book.url
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
  },
};
</script>
<style lang="scss">
.preview-pdf {
  h1 {
    margin: 30px auto;
    text-align: center;
    font-family: "宋体";
    letter-spacing: 2px;
  }
}


</style>




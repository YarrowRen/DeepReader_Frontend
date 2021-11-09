<template>
  <div id="d1">
    <el-row>
      <el-col :span="5">
        -
      </el-col>
      <el-col :span="14">
        <el-card style="text-align: center">
          <h3>主题任务：讨论《故事新编》，《呐喊》等三篇文章的中心思想</h3>
          <el-divider />
          <p>请结合三篇阅读文章，在下方对文章的中心思想进行讨论</p>

          <el-button type="primary" @click="openDialog">《故事新编》</el-button>
          <el-button type="primary" @click="openDialog">《呐喊》</el-button>
          <el-button type="primary" @click="openDialog">《彷徨》</el-button>
          <el-divider />
          <el-link href="#editor" type="primary">回复主题</el-link>
        </el-card>

        <br>

        <el-card>
          <h3>回复：（共十条回复）</h3>
          <el-divider />
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              中心思想，是作者在文章中要表达的贯穿全文的核心，是提纲挈领的道理，<br>是作者在文章中努力通过各种细节来阐明的中心议题。<br>简单地说，中心思想就是作者要告诉我们的道理和内涵。
            </div>
            <br>
            <el-row>
              <el-col :span="20">
                <el-link type="success">学生甲</el-link>
              </el-col>
              <el-col :span="4">
                点赞
                <i v-if="!uptype" class="el-icon-star-off" @click="upStar" />
                <i v-if="uptype" class="el-icon-star-on" @click="upStar" />
                {{ num1 }}
              </el-col>
            </el-row>

            <el-divider />
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              《博弈圣经》中心思想的定义；我们把感觉、思维、意识、观念，定义为中心思想。<br>
              中心思想的定义<br>
              《博弈圣经》中心思想的定义；我们把感觉、思维、意识、观念，定义为中心思想。<br>
              【博弈圣经著作人写道；感觉、思维、意识、观念、主观、理性、真理，这是文化进程。按照七个文化私湍的次序，我们把七个“文化私湍”中的第四位“观念”，定义为中心。由于第四位“观念”之前的文化私湍与大脑无关，它来至于第三空间的宇宙中心。观念就像是渐渐进入七个文化私湍的中心固定下来，成为中心思想。】（观念近似一张中心思想的相片、独立的存在文化进程中。）
            </div>
            <br>
            <el-row>
              <el-col :span="20">
                <el-link type="success">学生乙</el-link>
              </el-col>
              <el-col :span="4">
                点赞
                <i class="el-icon-star-off" />
                3
              </el-col>
            </el-row>

            <el-divider />
          </el-col>

          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              其实中心思想并非唯一的，仁者见仁，智者见智。其实作者真正要说什么，只有作者本人清楚，我们只能说看到一个方面，大家比较公认的一面。<br>特别是古文，更是仁者见仁，文章为时而作，我们很难知道古人作文章时的背景跟故事，于是只能分析浅显的意思，大背景下的意思。<br>
              《永遇乐·京口北固亭怀古》用历史事实来说明现实问题。对孙权、刘裕的赞扬，就是对南宋统治者的指责；对刘义隆的讽刺，就是对韩侂胄的警告；对“佛狸祠下”的感叹，就是对南宋统治者不思收复中原的不满；廉颇的遭遇是对统治集团内部的矛盾和斗争的讽刺。
            </div>
            <br>
            <el-row>
              <el-col :span="20">
                <el-link type="success">学生丙</el-link>
              </el-col>
              <el-col :span="4">
                点赞
                <i class="el-icon-star-off" />
                5
              </el-col>
            </el-row>

            <el-divider />
          </el-col>

          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              文章题目是文章之眼目，是文章中心思想的体现，起到统领全文的作用。<br>有些作者往往把中心思想体现在题目上。这类文章的中心思想容易概括。<br>例如，《伟大的友谊》一课，就可以运用分析课题找中心的方法概括出体现马克思和恩格斯在共同的奋斗中建立了伟大友谊的中心思想。
            </div>
            <br>
            <el-row>
              <el-col :span="20">
                <el-link type="success">学生丁</el-link>
              </el-col>
              <el-col :span="4">
                点赞
                <i class="el-icon-star-off" />
                3
              </el-col>
            </el-row>

            <el-divider />
          </el-col>

          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              中心思想，是作者在文章中要表达的贯穿全文的核心，是提纲挈领的道理，<br>是作者在文章中努力通过各种细节来阐明的中心议题。<br>简单地说，中心思想就是作者要告诉我们的道理和内涵。
            </div>
            <br>
            <el-row>
              <el-col :span="20">
                <el-link type="success">张三</el-link>
              </el-col>
              <el-col :span="4">
                点赞
                <i class="el-icon-star-off" />
                3
              </el-col>
            </el-row>

            <el-divider />
          </el-col>

          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              中心思想，是作者在文章中要表达的贯穿全文的核心，是提纲挈领的道理，<br>是作者在文章中努力通过各种细节来阐明的中心议题。<br>简单地说，中心思想就是作者要告诉我们的道理和内涵。
            </div>
            <br>
            <el-row>
              <el-col :span="20">
                <el-link type="success">李四</el-link>
              </el-col>
              <el-col :span="4">
                点赞
                <i class="el-icon-star-off" />
                3
              </el-col>
            </el-row>

            <el-divider />
          </el-col>

          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              中心思想，是作者在文章中要表达的贯穿全文的核心，是提纲挈领的道理，<br>是作者在文章中努力通过各种细节来阐明的中心议题。<br>简单地说，中心思想就是作者要告诉我们的道理和内涵。
            </div>
            <br>
            <el-row>
              <el-col :span="20">
                <el-link type="success">王五</el-link>
              </el-col>
              <el-col :span="4">
                点赞
                <i class="el-icon-star-off" />
                3
              </el-col>
            </el-row>

            <el-divider />
          </el-col>
        </el-card>

        <br>

        <div id="editor">
          <el-card>
            <div ref="editorElem" class="wangeditor mt15" />
            <br>
            <div style="text-align: center">
              <el-button type="success">回复主题</el-button>
            </div>
          </el-card>
        </div>

        <div>
          <el-dialog :visible.sync="dialogFormVisible">
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
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import E from 'wangeditor'

export default {

  props: ['setEditorValue', 'remark', 'path'],
  data() {
    return {
      dialogFormVisible: false,
      list: [
        { id: 1, name: 'zs1' },
        { id: 2, name: 'zs2' },
        { id: 3, name: 'zs3' },
        { id: 4, name: 'zs4' },
        { id: 5, name: 'zs5' },
        { id: 6, name: 'zs6' }
      ],
      num1: 0,
      uptype: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      content: '',
      editor: null
    }
  },
  watch: {
    remark(val) {
      if (this.editor != '') {
        this.editor.txt.html(val)
      }
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
    ...mapActions('books', ['getBookContent']),
    getContent() {
      this.getBookContent('1000517').then((response) => {
        this.content = response
      })
    },
    openDialog() {
      this.dialogFormVisible = true
    },
    openForm() {
      this.dialogFormVisible = true
    },
    upStar() {
      if (this.uptype) {
        this.uptype = false
        this.num1 = 0
      } else {
        this.uptype = true
        this.num1 = 1
      }
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem)
    this.editor.customConfig = {

      menus: [

        'head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough',

        'foreColor', 'backColor', 'link', 'list', 'justify', 'quote',

        'emoticon', 'image', 'table', 'undo', 'redo'

      ],

      fontNames: [

        '宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'

      ],

      colors: [

        '#000000', '#eeece0', '#1c487f', '#4d80bf', '#c24f4a', '#8baa4a', '#7b5ba1', '#46acc8', '#f9963b', '#ffffff'

      ],

      // 编辑区域的 z-index

      zIndex: 10000,

      // 是否开启 debug 模式（debug 模式下错误会 throw error 形式抛出）

      debug: false,

      // 插入链接时候的格式校验

      linkCheck: function(text, link) {
        // text 是插入的文字

        // link 是插入的链接

        return true
      },

      // 插入网络图片的校验

      linkImgCheck: function(src) {
        // src 即图片的地址

        return true
      },

      // 粘贴过滤样式，默认开启

      pasteFilterStyle: true,

      // 粘贴内容时，忽略图片。默认关闭

      pasteIgnoreImg: false,

      // 对粘贴的文字进行自定义处理，返回处理后的结果。编辑器会将处理后的结果粘贴到编辑区域中。

      // IE 暂时不支持

      pasteTextHandle: function(content) {
        // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回

        return content
      },

      // onchange 事件

      onchange: (html) => {
        this.$emit('setEditorValue', html)
      },

      // 是否显示添加网络图片的 tab

      showLinkImg: true,

      // 插入网络图片的回调

      linkImgCallback: function(url) {

        // console.log(url)  // url 即插入图片的地址

      },

      // 默认上传图片 max size: 5M

      uploadImgMaxSize: 5 * 1024 * 1024,

      // 配置一次最多上传几个图片

      // uploadImgMaxLength: 5,

      // 上传图片，是否显示 base64 格式

      uploadImgShowBase64: false,

      // 上传图片，server 地址（如果有值，则 base64 格式的配置则失效）

      uploadImgServer: this.path || false,

      // 自定义配置 filename

      uploadFileName: '',

      // 上传图片的自定义参数

      uploadImgParams: {

        // token: 'abcdef12345'

      },

      // 上传图片的自定义header

      uploadImgHeaders: {

        // 'Accept': 'text/x-json'

      },

      // 配置 XHR withCredentials

      withCredentials: false,

      // 自定义上传图片超时时间 ms

      uploadImgTimeout: 10000,

      // 上传图片 hook

      uploadImgHooks: {

        // customInsert: function (insertLinkImg, result, editor) {

        //    console.log('customInsert')

        //    // 图片上传并返回结果，自定义插入图片的事件，而不是编辑器自动插入图片

        //    const data = result.data1 || []

        //    data.forEach(link => {

        //        insertLinkImg(link)

        //    })

        // },

        before: function(xhr, editor, files) {

          // 图片上传之前触发

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传

          // return {

          //    prevent: true,

          //    msg: '放弃上传'

          // }

        },

        success: function(xhr, editor, result) {

          // 图片上传并返回结果，图片插入成功之后触发

        },

        fail: function(xhr, editor, result) {

          // 图片上传并返回结果，但图片插入错误时触发

        },

        error: function(xhr, editor) {

          // 图片上传出错时触发

        },

        timeout: function(xhr, editor) {

          // 图片上传超时时触发

        }

      }

    }

    this.editor.create()

    if (this.remark) {
      this.editor.txt.html(`<p>${this.remark}</p>`)
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


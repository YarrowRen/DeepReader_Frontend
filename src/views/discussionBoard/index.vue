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
          <el-col :span="24">
            <div>
              <el-tag>第一次作业</el-tag> <el-link type="primary" :underline="false" href="/#/discussion/index">《故事新编》等三篇文章的中心思想有何不同，试给出答案</el-link>
            </div>
            <br>
            <el-row>
              <el-col :span="16">
                <el-link type="success">袁华老师</el-link>
                <el-divider direction="vertical" />
                2020/02/16 发表
                <el-divider direction="vertical" />
                <el-link type="success">张三</el-link>
                最后回复（2020-6-30）
              </el-col>
              <el-col :span="8">
                浏览：2008
                <el-divider direction="vertical" />
                回复：54
              </el-col>
            </el-row>

            <el-divider />
          </el-col>

        </el-card>

        <br>

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


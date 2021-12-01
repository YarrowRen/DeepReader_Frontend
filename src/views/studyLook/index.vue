<template>
  <div class="app-container">
    <el-container>
      <el-main>
        
        <el-row>
          <el-col :span="5">
            -
          </el-col>
          <el-col :span="14">
            <div >
              <el-row :gutter="20">
                <div>
                  <el-col v-if="showContent" :span="contentSpan" :xs="24">
                    <el-card>
                      <el-tabs v-model="activeTab2">
                        <el-tab-pane label="章节目录" name="chapter">
                          <chapter :book="book"/>
                        </el-tab-pane>
                        <el-tab-pane label="文章内容" name="myContent">
                          <myContent :book="book"/>
                        </el-tab-pane>
                      </el-tabs>
                    </el-card>
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-col>
          
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MyContent from './components/MyContent'
import Chapter from './components/Chapter'

export default {
  name: 'Study',
  components: { MyContent, Chapter },
  data() {
    return {
      book: {
        bookId: '',
        name: '',
        author: '',
        pages: '',
        brief_introduction: '',
      },
      contentSpan: 24,
      questionSpan: 0,
      showContent: true,
      active: 0,
      percent: 0,
      major: {},
      activeTab2: 'chapter'
    }
  },
  computed: {
    ...mapState('books', ['title'])
  },
  created() {
    this.book.bookId=this.$route.query.bookId //获取图书编号
    this.getBook(this.book.bookId)
  },
  methods: {
    ...mapActions('books', ['getBookInfo']),
    getBook(bookId){
      this.getBookInfo(bookId).then(response => {
        this.book = response
        this.book.bookId=this.$route.query.bookId
      })
    },
    changeCard() {
      if (this.activeTab2 == 'chapter') {
        this.activeTab2 = 'myContent'
      } else {
        this.activeTab2 = 'chapter'
      }
    },
    nextPage() {
      this.activeTab2 = 'myContent'
      this.active = 1
    },
    backPage() {
      this.activeTab2 = 'chapter'
      this.active = 0
    },
    closeContent() {
      this.showContent = false
      this.questionSpan = 24
    },
    openContent() {
      this.showContent = true
      this.questionSpan = 10
    },
    changePercent() {
      if (this.percent >= 4) {
        this.percent = 0
      } else {
        this.percent++
      }
    }
  }
}
</script>

<style>
</style>

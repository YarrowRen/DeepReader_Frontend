<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="8">
            <div style="text-align: left">
              -
            </div>
          </el-col>
          <el-col :span="8">
            <el-steps :active="percent" finish-status="success">
              <el-step title="泛读提问" />
              <el-step title="精读回答" />
              <el-step title="读后反思" />
              <el-step title="考考同伴" />
            </el-steps>
          </el-col>
          <el-col :span="8">
            <div style="text-align: right">
              -
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div >
          <el-row :gutter="20">
            <div>
              <el-col v-if="showContent" :span="contentSpan" :xs="24">
                <el-card>
                  <el-tabs v-model="activeTab2">
                    <el-tab-pane v-if="active==0"  name="chapter">
                      <chapter :book="book"/>
                    </el-tab-pane>
                    <el-tab-pane v-if="active==1" name="myContent">
                      <myContent :book="book" v-if="book.url!==''"/>
                    </el-tab-pane>
                  </el-tabs>
                </el-card>
              </el-col>
            </div>

            <el-col :span="questionSpan" :xs="24">
              <el-card>
                <el-tabs v-model="activeTab">
                  <el-tab-pane  name="strategyForm">
                    <strategyForm :user="user" :book="book" @close="closeContent()" @next="nextPage()" @open="openContent()" @back="backPage()" @active="changePercent()" @requestion="reQuestion()" />
                  </el-tab-pane>
                </el-tabs>
              </el-card>
            </el-col>

          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MyContent from './components/MyContent'
import StrategyForm from './components/StrategyForm'
import Chapter from './components/Chapter'

export default {
  name: 'Study',
  components: { MyContent, StrategyForm, Chapter },
  data() {
    return {
      book: {
        bookId: '',
        name: '',
        author: '',
        pages: '',
        brief_introduction: '',
        url: ''
      },
      contentSpan: 14,
      questionSpan: 10,
      showContent: true,
      active: 0,
      percent: 0,
      major: {},
      activeTab: 'strategyForm',
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
    },
    reQuestion() {
      this.percent = 3
    }
  }
}
</script>

<style>
</style>

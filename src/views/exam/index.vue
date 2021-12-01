<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="测试" name="examForm">
                <examForm :book="book" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ExamForm from './components/ExamForm'

export default {
  name: 'Exam',
  components: { ExamForm },
  data() {
    return {
      book: {
        bookId: '',
        name: '',
        author: '',
        pages: '',
        brief_introduction: '',
      },
      major: {},
      activeTab: 'examForm',
      active: 0
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
  }
}
</script>

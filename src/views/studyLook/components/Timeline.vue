<template>
  <div class="block" style="height: 650px; overflow: auto">
    <div>
      <h3 style="text-align: center">《故事新编》</h3>
      <el-divider content-position="right">作者：裘沙 王伟君</el-divider>
      <el-image :src="url" style=" height: 150px" />
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      content: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  computed: {
    ...mapState('books', ['title'])
  },
  created() {
    this.getContent()
  },
  methods: {
    ...mapActions('books', ['getBookContent']),
    getContent() {
      this.getBookContent('1000517').then(response => {
        this.content = response
      })
    }
  }
}
</script>

<template>
  <el-cascader
    v-model="value"
    :props="defaultParams"
    :options="options"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
      defaultParams: {
        label: 'name',
        value: 'id',
        children: 'children'
      }
    }
  },
  computed: {
    ...mapState('classify', ['title'])
  },
  created() {
    this.getClassify()
  },
  methods: {
    ...mapActions('classify', ['getClassifyAndBookList']),
    getClassify() {
      this.getClassifyAndBookList().then(response => {
        this.options = response
      })
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="上传文章" name="uploadFile">
                <uploadFile :user="user" />
              </el-tab-pane>
              <el-tab-pane label="上传作业" name="uploadWork">
                <uploadWork :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uploadFile from './components/uploadFile'
import uploadWork from './components/uploadWork'

export default {
  name: 'Study',
  components: { uploadFile,uploadWork },
  data() {
    return {
      user: {},
      major: {},
      activeTab: 'uploadFile',
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'username',
      'sex',
      'nation'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar,
        username: this.username,
        sex: this.sex,
        nation: this.nation
      }
    }
  }
}
</script>

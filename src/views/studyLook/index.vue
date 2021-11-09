<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <div v-if="user">
          <el-row :gutter="20">
            <div>
              <el-col v-if="showContent" :span="contentSpan" :xs="24">
                <el-card>
                  <el-tabs v-model="activeTab2">
                    <el-tab-pane label="章节目录" name="chapter">
                      <chapter />
                    </el-tab-pane>
                    <el-tab-pane label="文章内容" name="timeline">
                      <timeline />
                    </el-tab-pane>
                  </el-tabs>
                </el-card>
              </el-col>
            </div>

          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Timeline from './components/Timeline'
import Account from './components/Account'
import testForProfile from './components/testForProfile'
import Chapter from './components/Chapter'

export default {
  name: 'Study',
  components: { UserCard, Timeline, Account, testForProfile, Chapter },
  data() {
    return {
      contentSpan: 24,
      questionSpan: 0,
      showContent: true,
      active: 0,
      percent: 0,
      user: {},
      major: {},
      activeTab: 'account',
      activeTab2: 'chapter'
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
    },
    changeCard() {
      if (this.activeTab2 == 'chapter') {
        this.activeTab2 = 'timeline'
      } else {
        this.activeTab2 = 'chapter'
      }
    },
    nextPage() {
      this.activeTab2 = 'timeline'
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

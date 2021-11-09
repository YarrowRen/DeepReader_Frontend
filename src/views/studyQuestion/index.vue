<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <div v-if="user">
          <el-row :gutter="20">

            <el-col :span="questionSpan" :xs="24">
              <el-card>
                <el-tabs v-model="activeTab">
                  <el-tab-pane label="KWL策略表格" name="account">
                    <account :user="user" @close="closeContent()" @next="nextPage()" @open="openContent()" @back="backPage()" @active="changePercent()" />
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
      contentSpan: 0,
      questionSpan: 24,
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

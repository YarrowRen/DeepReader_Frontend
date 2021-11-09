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
        <div v-if="user">
          <el-row :gutter="20">
            <div>
              <el-col v-if="showContent" :span="contentSpan" :xs="24">
                <el-card>
                  <el-tabs v-model="activeTab2">
                    <el-tab-pane v-if="active==0" label="章节目录" name="chapter">
                      <chapter />
                    </el-tab-pane>
                    <el-tab-pane v-if="active==1" label="文章内容" name="myContent">
                      <myContent />
                    </el-tab-pane>
                  </el-tabs>
                </el-card>
              </el-col>
            </div>

            <el-col :span="questionSpan" :xs="24">
              <el-card>
                <el-tabs v-model="activeTab">
                  <el-tab-pane label="KWL策略表格" name="strategyForm">
                    <strategyForm :user="user" @close="closeContent()" @next="nextPage()" @open="openContent()" @back="backPage()" @active="changePercent()" @requestion="reQuestion()" />
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
import MyContent from './components/MyContent'
import StrategyForm from './components/StrategyForm'
import Chapter from './components/Chapter'

export default {
  name: 'Study',
  components: { MyContent, StrategyForm, Chapter },
  data() {
    return {
      contentSpan: 14,
      questionSpan: 10,
      showContent: true,
      active: 0,
      percent: 0,
      user: {},
      major: {},
      activeTab: 'strategyForm',
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

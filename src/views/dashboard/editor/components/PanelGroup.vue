<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            阅读文章数 <count-to :start-val="0" :end-val="this.dataCount.readCount" :duration="2600" class="card-panel-num" />
          </div>
          
          
          <div class="card-panel-text">
            剩余文章数 <count-to :start-val="0" :end-val="this.dataCount.unReadCount" :duration="3600" class="card-panel-num" />
          </div>

          
          <div class="card-panel-text">
            阅读时速度 <count-to :start-val="0" :end-val="this.dataCount.avgReadTime" :duration="3600" class="card-panel-num" />(秒)
          </div>
          

        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            提问问题数量： <count-to :start-val="0" :end-val="this.dataCount.questionCount" :duration="3000" class="card-panel-num" />
          </div>
          <div class="card-panel-text">
            提问问题得分： {{this.dataCount.avgQuestionRate}}
          </div>
          
          <div class="card-panel-text">
            问题回答人数： <count-to :start-val="0" :end-val="this.dataCount.beAnsweredCount" :duration="3000" class="card-panel-num" />
          </div>
          
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="eye-open" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            评价问题数 <count-to :start-val="0" :end-val="this.dataCount.opinionCount" :duration="3200" class="card-panel-num" />
          </div>
          <div class="card-panel-text">
            回答问题数 <count-to :start-val="0" :end-val="this.dataCount.answerCount" :duration="3600" class="card-panel-num" />
          </div>
          
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CountTo from 'vue-count-to'

export default {
  data(){
    return{
      dataCount: {
        questionCount: 0,
        answerCount: 0,
        opinionCount: 0,
        avgReadTime: 0,
        readCount: 0,
        unReadCount: 0,
        avgQuestionRate: 0.0,
        beAnsweredCount: 0
      }
    }
  },
  components: {
    CountTo
  },
  created(){
    this.getDataCount()
  },
  methods: {
    ...mapActions('user', ['userDataCount']),
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    
    getDataCount(){
      this.userDataCount().then(response => {
        this.dataCount = response
        this.dataCount.avgQuestionRate=parseFloat(this.dataCount.avgQuestionRate).toFixed(1)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 130px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

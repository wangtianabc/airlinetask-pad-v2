<template>
  <el-row class="panel-group" :gutter="20">
    <el-col :xs="12" :sm="12" :lg="5" class="card-panel-col">
      <div class='card-panel' @click="handleSelectState('unAccept')">
        <div class="card-panel-icon-wrapper icon-forreceive">
          <svg-icon icon-class="doc_list" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('task.unaccept')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="unAccept" :duration="1500"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSelectState('accept')">
        <div class="card-panel-icon-wrapper icon-received">
          <svg-icon icon-class="details" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('task.accept')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="accept" :duration="1500"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSelectState('onSpot')">
        <div class="card-panel-icon-wrapper icon-arrived">
          <svg-icon icon-class="maps" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('task.onspot')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="onSpot" :duration="1500"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSelectState('onWork')">
        <div class="card-panel-icon-wrapper icon-start">
          <svg-icon icon-class="work" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('task.onwork')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="onWork" :duration="1500"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSelectState('finished')">
        <div class="card-panel-icon-wrapper icon-finished">
          <svg-icon icon-class="zip" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('task.finished')}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="finished" :duration="1500"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props: {
    unAccept: {
      type: Number,
      default: 10
    },
    accept: {
      type: Number,
      default: 13
    },
    onSpot: {
      type: Number,
      default: 33
    },
    onWork: {
      type: Number,
      default: 55
    },
    finished: {
      type: Number,
      default: 500
    }
  },
  components: {
    CountTo
  },
  methods: {
    handleSelectState(type) {
      this.$emit('handleSelectState', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #f0ffff;
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-forreceive {
         background: #40c9c6;
      }
      .icon-received {
        background: #36a3f7;
      }
      .icon-arrived {
        background: #f4516c;
      }
      .icon-start {
        background: #367517;
      }
      .icon-finished {
        background: #ff8000;
      }
    }
    .icon-forreceive {
      color: #fff;
      background: #40c9c6;
    }
    .icon-received {
      color: #fff;
      background: #36a3f7;
    }
    .icon-arrived {
      color: #fff;
      background: #f4516c;
    }
    .icon-start {
      color: #fff;
      background: #367517;
    }
    .icon-finished {
      color: #fff;
      background: #ff8000;
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
</style>

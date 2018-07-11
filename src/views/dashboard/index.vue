<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import adminDashboard from './admin'

export default {
  name: 'dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  created() {
    this.$notify({
      title: '提示',
      message: '航班号为蓝色字体的为一二方航班，点击可以查看具体工作条目。'
    })
  }
}
</script>

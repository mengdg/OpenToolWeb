<template>
  <div v-loading="loading" class="dashboard-container">
    <!-- <el-card v-for="(item, index) in cards" :key="'top' + index" class="box-card">
      <div slot="header" class="clearfix">
        <span class="text text-top">{{ item.name }}</span>
        <router-link to="/tools/list">
          <el-button style="float: right; padding: 3px 0" type="text">更多<i class="el-icon-d-arrow-right el-icon--right" /></el-button>
        </router-link>
      </div>
      <v-top-card :paths="item.data" />
    </el-card> -->
    <el-card v-for="(item, index) in urlData" :key="index" class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="item.name === '推荐应用'" class="text" style="color:red;">{{ item.name }}</span>
        <span v-else class="text">{{ item.name }}</span>
      </div>
      <v-card :paths="item.navs" />
    </el-card>
  </div>
</template>

<script>
import Card from './components/Card'
import { Navigation } from '@/api/navigation'

export default {
  name: 'Navigation',
  components: {
    'v-card': Card
  },
  data() {
    return {
      cards: [],
      urlData: [],
      kinds: [],
      loading: false
    }
  },
  created() {
    this._requestNavs()
  },
  methods: {
    _requestNavs() {
      this.loading = true
      Navigation.get_kind().then(response => {
        const { data, code } = response
        if (code === 200) {
          this.kinds = data
        }
        this.loading = false
      })
      Navigation.get_nav().then(response => {
        const { data } = response
        this.cards = data
        this.urlData = data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 24px;
  min-height: 700px;
}
.box-card {
  width: 100%;
  margin: 20px 0;
}
.text {
  font-size: 16px;
  font-weight: 600;
}
.text-top {
  color: red;
}
</style>

<style>
.el-card__header {
  padding: 12px 14px;
}
</style>

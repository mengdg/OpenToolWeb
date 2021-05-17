<template>
  <div class="createPost-container" style="margin:20px">
    <el-tabs
      v-model="activeName"
      v-loading="loading"
      type="border-card"
      style="min-height:650px"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in activeInfo"
        :key="item.id"
        :label="item.label"
        :name="item.name"
      >
        <span
          v-for="info in item.tools"
          :key="info.id"
        >
          <div class="item">
            <div class="item-inner">
              <div class="item-hd">
                <span class="item-icon">
                  <img :src="info.image" width="48" height="48" alt="view">
                </span>
                <h3>
                  {{ info.name }}
                </h3>
                <span v-if="info.visit_sum > 10000">{{ (info.visit_sum/10000).toFixed(1) }}w次浏览</span>
                <span v-else>{{ info.visit_sum }}次浏览</span>
                <span
                  class="item-category"
                  style="cursor:pointer"
                  @click="handleProject(info.project)"
                >
                  [ {{ info.project.label }} ]
                </span>
              </div>
              <div class="item-bd">
                <div class="item-desc" :title="info.describe">
                  {{ info.describe }}
                </div>
              </div>
              <div class="item-ft">
                <span
                  class="item-link"
                  :title="'http://qa.blued.com/tools/'+info.card_router"
                >
                  http://qa.blued.com/tools/{{ info.card_router }}
                </span>
                <router-link
                  class="item-btn"
                  :to="{ name: 'Tool', params: { path: info.card_router, id: info.id }}"
                >
                  进入
                </router-link>
              </div>
            </div>
          </div>
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Tool } from '@/api/tool'

export default {
  name: 'ToolList',
  data() {
    return {
      loading: false,
      activeName: 'all',
      activeInfo: [{
        id: 0,
        name: 'all',
        lable: '所有',
        tools: []
      }]
    }
  },
  mounted() {
    this._request_tools()
  },
  methods: {
    _request_tools() {
      this.loading = true
      Tool.get_tools().then(response => {
        this.loading = false
        const { code, data } = response
        if (code === 200) {
          this.activeInfo = data
        }
      })
    },
    handleClick(tab, event) {},
    handleProject(project) {
      this.activeName = project.name
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  width: 273px;
  float: left;
  margin: 0 13px 13px 0;
  border: 1px solid #ccc;
  background-image: -webkit-linear-gradient(top, #fff, #f9f9f9);
  position: static;
  border-radius: 5px;
  -webkit-transition: -webkit-box-shadow .3s ease-in-out;
  transition: -webkit-box-shadow .3s ease-in-out;
  transition: box-shadow .3s ease-in-out;
  transition: box-shadow .3s ease-in-out, -webkit-box-shadow .3s ease-in-out;
  &:hover {
    -webkit-box-shadow: 0 3px 8px 0 rgba(0, 0, 0, .2);
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, .2)
  }
  a {
    color: #333;
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
  }
  .item-inner {
    padding: 10px 15px 10px 8px;
    position: relative;
    font-size: 12.8px;
    .item-hd {
      height: 48px;
      .item-icon {
        float: left;
        margin-right: 10px
      }
      h3 {
        font-size: 16px;
        font-weight: 700;
        margin: 0;
        line-height: 1.4;
        margin-bottom: 5px;
        height: 22px;
        overflow: hidden;
      }
      .item-category {
        float: right;
      }
    }
    .item-bd {
      .item-desc {
        color:#333;
        border-top: 1px solid #ddd;
        margin-top: 8px;
        padding: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }
    }
    .item-ft {
      text-align: right;
      width: 100%;
      .item-link {
        float: left;
        text-align: left;
        margin-top: 3px;
        color: #999;
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }
      .item-btn {
        display: inline-block;
        padding: 3px 12px;
        text-decoration: none;
        width: 60px;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          -webkit-transition: all .2s ease-in-out;
          transition: all .2s ease-in-out;
          left: 50%;
          right: 50%;
          bottom: 0;
          border-bottom: 2px solid transparent
        }
        &:hover:before {
          left: 0;
          right: 0;
          border-bottom-color: #009a61
        }
      }
    }
  }
}
</style>

<style scoped>
@media (max-width: 767px) {
  .item {
    width: 100%;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .item {
    width: calc(50% - 13px);
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .item {
    width: calc(33% - 10px);
  }
}
@media (min-width: 1200px) {
  .item {
    width: calc(25% - 13px);
  }
}
</style>

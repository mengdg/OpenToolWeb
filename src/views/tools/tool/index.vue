<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-page-header :content="toolParams.name" title="返回" @back="goBack" />
      </div>
      <div v-loading="loading" class="main">
        <v-tip><span v-html="toolParams.describe" /></v-tip>
        <el-form v-model="toolParams.params" label-width="auto" label-position="left">
          <el-row>
            <span v-for="(item,index) in toolParams.params" :key="index">
              <el-col :span="12">
                <el-form-item v-if="item.type.value === 'string'" :label="item.name">
                  <el-input
                    v-model="item.default"
                    :placeholder="item.placeholder"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item v-if="item.type.value === 'areatext'" :label="item.name">
                  <el-input
                    v-model="item.default"
                    type="textarea"
                    :rows="2"
                    :placeholder="item.placeholder"
                    width="100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="item.type.value === 'number'" :label="item.name">
                  <el-input-number
                    v-model="item.default"
                    :placeholder="item.placeholder"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="item.type.value === 'boolean'" :label="item.name">
                  <el-switch
                    v-model="item.default"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="item.type.value === 'time'" :label="item.name">
                  <el-date-picker
                    v-model="item.default"
                    type="datetime"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    :placeholder="item.placeholder"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item v-if="item.type.value === 'radio'" :label="item.name">
                  <span v-for="(radios,index_radio) in item.select" :key="index_radio" style="margin-right:5px">
                    <el-radio v-model="item.default" :label="radios" border>{{ radios }}</el-radio>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item v-if="item.type.value === 'checkbox'" :label="item.name">
                  <el-checkbox-group v-model="item.default">
                    <span v-for="(checkbox,index_box) in item.select" :key="index_box" style="margin-right:5px">
                      <el-checkbox :label="checkbox" border />
                    </span>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="item.type.value === 'dropdown'" :label="item.name">
                  <el-select v-model="item.default" placeholder="请选择">
                    <el-option
                      v-for="(select,index_select) in item.select"
                      :key="index_select"
                      :label="select"
                      :value="select"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </span>
          </el-row>
        </el-form>
        <el-form v-model="toolParams.function_meta" inline>
          <el-form-item v-for="(item,index) in toolParams.function_meta" :key="index">
            <el-button type="primary" @click="handleFun(item)">{{ item.name }}</el-button>
          </el-form-item>
        </el-form>
        <v-jsoneditor
          v-if="result !== null"
          v-model="result"
          :options="options"
          height="600px"
        />
      </div>
      <div class="rf">
        <slot name="rf" />
        <router-link
          v-permission="['admin', 'editor']"
          :to="{ name: 'EditTool', params: { id: toolParams.id }}"
        >
          <el-button
            v-permission="['admin', 'editor']"
            style="width:90%;margin-bottom:10px;"
            class="el-icon-edit"
            type="success"
          >
            在线编辑
          </el-button>
        </router-link>
        <img src="@/assets/image/BLCT.png">
        <!-- 心灵鸡汤 -->
        <div class="note">
          <div class="note-container">
            {{ wisdom }}
          </div>
          <div class="note-bottom" />
        </div>
        <!-- 浏览记录 -->
        <div class="inner">
          <div class="panel">
            <div class="panel-heading">浏览记录</div>
            <div class="panel-body">
              <ul v-for="item in viewer" :key="item.id" class="box-list">
                <li>
                  <a :title="item.create_time+'【'+item.user.name+'】'">
                    <!-- <span class="top-num">1</span> -->
                    <span class="title">{{ item.create_time }}【{{ item.user.name }}】</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Tip from '@/components/Tip'
import { Tool } from '@/api/tool'
import { Wisdom } from '@/api/wisdom'
import { Visit } from '@/api/visit'
import { Launch } from '@/api/run'
import permission from '@/directive/permission/index.js' // 权限判断指令

export default {
  name: 'Tool',
  directives: { permission },
  components: {
    'v-tip': Tip
  },
  data() {
    return {
      loading: false,
      toolID: 0,
      toolParams: {},
      result: null,

      wisdom: '',
      viewer: [],

      options: {
        mode: 'code',
        indentation: 4
      }
    }
  },
  created() {
    this.toolID = this.$route.params.id
    this._request_tool()
    this._request_wisdom()
    this._request_get_viewer()
    this._request_create_visit()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    handleFun(funs) {
      const variables_dict = {}
      const params_dict = {}
      const params_list = []
      this.toolParams.params.forEach(element => {
        variables_dict[element.varName] = element.default
      })
      params_dict[funs.name] = funs.script
      params_list.push(params_dict)
      this._request_run(variables_dict, params_list)
    },
    async _request_tool() {
      this.loading = true
      Tool.get_tool(this.toolID).then(response => {
        const { code, extra } = response
        if (code === 200) {
          this.toolParams = extra
          this.loading = false
          // this.$route.meta.title = extra.name
        }
      })
    },
    _request_wisdom() {
      Wisdom.get_wisdom().then(response => {
        const { code, extra } = response
        if (code === 200) {
          this.wisdom = extra.text
        }
      })
    },
    _request_get_viewer() {
      Visit.get_viewer(this.toolID).then(response => {
        const { code, data } = response
        if (code === 200) {
          this.viewer = data
        }
      })
    },
    _request_create_visit() {
      Visit.create_visit(this.toolID)
    },
    _request_run(variables, params) {
      Launch.run(this.toolID, variables, params).then(response => {
        const { code, message, data } = response
        if (code === 200) {
          if (message === '无响应信息') {
            this.$notify({
              title: '成功',
              message: message,
              type: 'success'
            })
          } else {
            this.result = data
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 24px;
  }
}
.main {
  min-height: 600px;
  float: left;
}
.rf {
  min-height: 600px;
  float: right;
  width: 25%;
  text-align: center;
  img {
    width: 90%;
    padding: 10px;
    transition: all 2s;
    -webkit-transition: all 2s
  }
  img:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1)
  }
  .note {
    color: #444;
    font: 80%/1.65 Verdana, "Geneva CE", lucida, 'Microsoft YaHei', sans-serif;
    width: 90%;
    padding-top: 38px;
    margin: 0 auto;
    background: url('../../../assets/image/bg-note-top.png') top center no-repeat;
    .note-container {
      padding: 1px 20px 0;
      text-indent: 2em;
      text-align: left;
      background: url('../../../assets/image/bg-note-middle.png') top center repeat-y;
      overflow: hidden;

    }
    .note-bottom {
      padding-bottom: 34px;
      background: url('../../../assets/image/bg-note-bottom.png') bottom center no-repeat;
    }
  }
}
.inner {
  padding: 1px 5px 0;
  margin: 0 10px;
  margin-top: 15px;
  position: relative;
  color: #444;
  font: 80%/1.65 Verdana, "Geneva CE", lucida, 'Microsoft YaHei', sans-serif;
  .panel {
    border: 1px solid #CCC;
    .panel-heading {
      background: #f5f5f5;
      padding: 5px 7px;
      text-align: left;
    }
    .panel-body {
      padding: 5px 0;
      .box-list {
        margin: 0;
        list-style: none;
        padding: 0;
        li {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
          a {
            color: #333;
            text-decoration: none;
            display: block;
            line-height: 2.2;
            padding: 0;
            span {
              display: inline-block;
              vertical-align: top;
            }
            .top-num {
              margin-right: 5px;
              margin-left: 10px;
            }
            span.title {
              // color: #009a61;
              padding-left: 5px;
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>

<style scoped>
@media (max-width: 767px) {
  .main {
    width: 100%;
  }
  .rf {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .main {
    width: 100%;
  }
  .rf {
    display: none;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .main {
    width: 100%;
  }
  .rf {
    display: none;
  }
}
@media (min-width: 1200px) {
  .main {
    width: 75%;
  }
}
</style>

<style>
.el-page-header__content {
  font-size: 15px;
  font-weight: 500;
}
.el-card__header {
  padding: 14px 20px;
}
</style>

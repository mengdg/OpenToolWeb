<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" class-name="sub-navbar draft">
        <OperateDropdown
          :value="projects"
          :project="selectedProject"
          @input="selectProject"
        />
        <el-button
          v-loading="loading"
          type="warning"
          style="margin-left:10px"
          @click="draftForm"
        >
          保存
        </el-button>
      </sticky>

      <div v-loading="loadingTool" class="createPost-main-container">
        <el-tabs v-model="activeName" @tab-click="handleTab">

          <el-tab-pane label="基本信息" name="first">
            <el-row>
              <el-form-item style="margin-top: 20px;" prop="name">
                <el-input v-model="postForm.name" placeholder="请输入工具名称">
                  <template slot="prepend">
                    名称
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item style="margin-top: 20px;" prop="card_router">
                <el-input v-model="postForm.card_router" placeholder="请输入工具路由，如：viewuser">
                  <template slot="prepend">
                    路由
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item prop="image">
                <el-input v-model="postForm.image" placeholder="请输入工具图标链接">
                  <template slot="prepend">
                    图标
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item style="margin-bottom: 0" prop="describe">
                <el-input v-model="postForm.describe" :rows="4" type="textarea" placeholder="请输入功能介绍" />
              </el-form-item>

              <el-form-item v-if="postForm.describe !== ''">
                <Tip><span v-html="postForm.describe" /></Tip>
              </el-form-item>

            </el-row>
          </el-tab-pane>

          <el-tab-pane label="变量管理" name="second">
            <el-form-item style="margin-top:18px">
              <el-button style="margin-bottom: 15px" type="primary" @click="handleAddVar">添加变量</el-button>
              <el-table
                ref="multipleTable"
                :data="postForm.params"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column
                  label="展示名称"
                  width="160"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" placeholder="请输入显示名称" />
                  </template>
                </el-table-column>

                <el-table-column
                  label="变量名称"
                  width="160"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.varName" placeholder="请输入变量名称" @input="checkVar" />
                  </template>
                </el-table-column>

                <el-table-column
                  prop="name"
                  label="类型"
                  width="130"
                >
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.type.value"
                      placeholder="请选择"
                      @change="selectChange(scope.row)"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>

                <el-table-column
                  label="占位符"
                  width="160"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.placeholder" placeholder="请输入占位符" />
                  </template>
                </el-table-column>

                <el-table-column
                  prop="address"
                  label="默认值"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                      v-if="scope.row.type.value == 'string'"
                      v-model="scope.row.default"
                      :placeholder="scope.row.placeholder"
                    />
                    <el-input
                      v-else-if="scope.row.type.value == 'areatext'"
                      v-model="scope.row.default"
                      type="textarea"
                      :rows="1"
                      :placeholder="scope.row.placeholder"
                    />
                    <el-input-number
                      v-else-if="scope.row.type.value == 'number'"
                      v-model="scope.row.default"
                      :placeholder="scope.row.placeholder"
                    />
                    <el-switch
                      v-else-if="scope.row.type.value == 'boolean'"
                      v-model="scope.row.default"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    />
                    <el-date-picker
                      v-else-if="scope.row.type.value == 'time'"
                      v-model="scope.row.default"
                      type="datetime"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      :placeholder="scope.row.placeholder"
                    />
                    <span v-else-if="scope.row.type.value === 'radio' || scope.row.type.value === 'dropdown'">
                      <el-select
                        v-model="scope.row.select"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请输入选项"
                        style="width:50%"
                      />
                      <el-input
                        v-model="scope.row.default"
                        :placeholder="scope.row.placeholder"
                        style="width:50%;margin-left:5px;"
                      />
                    </span>
                    <span v-else-if="scope.row.type.value === 'checkbox'">
                      <el-select
                        v-model="scope.row.select"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请输入选项"
                        style="width:50%"
                      />
                      <el-select
                        v-model="scope.row.default"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        :placeholder="scope.row.placeholder"
                        style="width:50%"
                      />
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="address"
                  label="操作"
                  show-overflow-tooltip
                  style="float:right"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      size="small"
                      @click="handleDeleteVar(scope.$index)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="code review" name="third">
            <el-form-item style="margin-top:18px">
              <AceCode :value="postForm.debugtalk.debugtalk" @input="changeCodeInput" />
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="调用函数" name="fourth">
            <el-form-item style="margin-top:18px">
              <el-button style="margin-bottom: 15px" type="primary" @click="handleAddFunc">添加调用操作</el-button>
              <el-table
                ref="multipleTable"
                :data="postForm.function_meta"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column
                  label="名称"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" placeholder="请输入名称" />
                  </template>
                </el-table-column>

                <el-table-column
                  label="关键字"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.script" placeholder="请输入关键字" />
                  </template>
                </el-table-column>

                <el-table-column
                  prop="address"
                  label="操作"
                  show-overflow-tooltip
                  style="float:right"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      size="small"
                      @click="handleDeleteFunc(scope.$index)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <Tip>关键字：${函数名($参数)}</Tip>
          </el-tab-pane>

          <el-tab-pane label="操作" name="fifth" :disabled="toolID === undefined">
            <el-form-item style="margin-top:18px">
              <p v-if="postForm.user">创建人：{{ postForm.user.name }}</p>
              <p v-else>创建人：</p>
              <p>创建时间：{{ postForm.create_time }}</p>
              <p>更新时间：{{ postForm.update_time }}</p>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="handleDelete"
              >
                <el-button slot="reference" type="danger">删除项目</el-button>
              </el-popconfirm>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>

      </div>
    </el-form>
  </div>
</template>

<script>
import { Project } from '@/api/project'
import { Tool } from '@/api/tool'

import OperateDropdown from './Dropdown/Operate'

import Tip from '@/components/Tip'
import AceCode from '@/components/ACECode'
import Sticky from '@/components/Sticky' // 粘性header组件
// import draggable from 'vuedraggable'

import { validURL } from '@/utils/validate'

const defaultForm = {
  name: '', // 题目
  describe: '', // 摘要
  image: '', // 图片
  params: [],
  debugtalk: {
    debugtalk: '# debugtalk.py\n#!/usr/bin/env python\n# encoding: utf-8\n'
  },
  project: {
    name: '',
    label: ''
  },
  function_meta: []
}

export default {
  name: 'ToolEdit',
  components: { AceCode, Sticky, Tip, OperateDropdown },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback(new Error('图标链接为必传项'))
      }
    }
    return {
      toolID: undefined,
      postForm: Object.assign({}, defaultForm),
      rules: {
        image: [{ validator: validateSourceUri }],
        name: [{ validator: validateRequire }],
        card_router: [{ validator: validateRequire }],
        describe: [{ validator: validateRequire }]
      },
      loading: false,
      loadingTool: false,

      activeName: 'first',
      options: [
        {
          value: 'string',
          label: '字符串'
        }, {
          value: 'areatext',
          label: '文本'
        }, {
          value: 'number',
          label: '数字'
        }, {
          value: 'boolean',
          label: '滑块'
        }, {
          value: 'time',
          label: '时间'
        }, {
          value: 'radio',
          label: '单选'
        }, {
          value: 'checkbox',
          label: '多选'
        }, {
          value: 'dropdown',
          label: '下拉菜单'
        }
      ],
      projects: [],
      selectedProject: ''
    }
  },
  computed: {},
  created() {
    this.toolID = this.$route.params.id
    this._request_projects()
    if (this.toolID !== undefined) {
      this._request_tool()
    }
  },
  methods: {
    _request_projects() {
      Project.get_project().then(response => {
        const { data } = response
        this.projects = data
      })
    },
    _request_tool() {
      this.loadingTool = true
      setTimeout(() => {
        Tool.get_tool(this.toolID).then(response => {
          const { extra } = response
          this.postForm = extra
          this.selectedProject = extra.project.label
          this.loadingTool = false
        }, 500)
      })
    },
    _request_delete_tool() {
      Tool.delete_tool(this.toolID).then(response => {
        const { code } = response
        if (code === 200) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
          this.$router.push({ name: 'ToolList' })
        }
      })
    },
    selectProject(val) {
      this.selectedProject = val.label
      this.postForm.project = val
    },
    // 点击Table
    handleTab() {},
    // 验证数据框
    draftForm() {
      if (this.postForm.name === '' || this.postForm.describe === '' || this.postForm.image === '') {
        this.$notify({
          title: '失败',
          message: '请完善基础信息',
          type: 'warning'
        })
        this.activeName = 'first'
      } else if (this.postForm.debugtalk.debugtalk === '# debugtalk.py\n#!/usr/bin/env python\n# encoding: utf-8\n') {
        this.$notify({
          title: '失败',
          message: '请编写code，若已编写加载失败，请重新打开该页面，重新加载！',
          type: 'warning'
        })
        this.activeName = 'third'
      } else if (this.postForm.function_meta.length === 0) {
        this.$notify({
          title: '失败',
          message: '请完善调用函数',
          type: 'warning'
        })
        this.activeName = 'fourth'
        // eslint-disable-next-line no-prototype-builtins
      } else if (!this.postForm.project.hasOwnProperty('id')) {
        this.$notify({
          title: '失败',
          message: '请选择项目分类',
          type: 'warning'
        })
      } else {
        if (this.toolID !== undefined) {
          Tool.update_tool(this.postForm).then(response => {
            const { code } = response
            if (code === 200) {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
              })
              this.$router.push({ name: 'ToolList' })
            }
          })
        } else {
          Tool.create_tool(this.postForm).then(response => {
            const { code } = response
            if (code === 200) {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success'
              })
              this.$router.push({ name: 'ToolList' })
            }
          })
        }
      }
    },

    // 添加变量
    handleAddVar() {
      this.postForm.params.push({ name: '', varName: '', type: { value: 'string', label: '字符串' }, default: '', placeholder: '请输入默认值', select: [] })
    },
    // 删除变量
    handleDeleteVar(index) {
      this.postForm.params.splice(index, 1)
    },
    // 检查变量
    checkVar(value) {
      const reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
      if (!value) {
        this.$message({
          message: '变量名称不能为空',
          type: 'error'
        })
      } else {
        setTimeout(() => {
          if (new RegExp(reg).test(value) === false) {
            this.$message({
              message: '变量名称只能为数字、字母、下划线',
              type: 'error'
            })
          }
        }, 1000)
      }
    },
    // 选择变量类型后，更改默认值
    selectChange(data) {
      const dataValue = data.type.value
      if (dataValue === 'string' || dataValue === 'areatext') {
        data.default = ''
      } else if (dataValue === 'number') {
        data.default = 1
      } else if (dataValue === 'boolean') {
        data.default = false
      } else if (dataValue === 'time') {
        data.default = ''
      } else if (dataValue === 'radio' || dataValue === 'dropdown') {
        data.select = []
        data.default = ''
      } else if (dataValue === 'checkbox') {
        data.select = []
        data.default = []
      }
    },
    // 添加调用函数
    handleAddFunc() {
      this.postForm.function_meta.push({ name: '', script: '' })
    },
    // 删除调用函数
    handleDeleteFunc(index) {
      this.postForm.function_meta.splice(index, 1)
    },
    // 修改代码后，修改变量
    changeCodeInput(debugtalk) {
      this.postForm.debugtalk.debugtalk = debugtalk
    },
    // 点击删除按钮
    handleDelete() {
      this._request_delete_tool()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>

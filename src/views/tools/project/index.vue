<template>
  <div style="margin:20px">
    <el-button
      type="primary"
      @click="handleCreateButton"
    >
      创建项目分类
    </el-button>
    <el-table
      ref="filterTable"
      v-loading="loading"
      :data="projects"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="60"
      />
      <el-table-column
        prop="name"
        label="Name"
      />
      <el-table-column
        prop="label"
        label="Label"
      />
      <el-table-column
        prop="state"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.state === 1 ? 'success' : 'danger'"
            disable-transitions
          >
            <span v-if="scope.row.state === 1">
              使用中
            </span>
            <span v-else>
              已下架
            </span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
      />
      <el-table-column
        label="编辑"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            style="margin-right:10px;"
            @click="handleEditButton(scope.row)"
          />
          <el-popconfirm
            v-if="scope.row.state === 1"
            title="确定删除吗？"
            @onConfirm="handleDeleteButton(scope.row)"
          >
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              circle
            />
          </el-popconfirm>
          <el-popconfirm
            v-else
            title="确定上架吗？"
            @onConfirm="handleDeleteButton(scope.row)"
          >
            <el-button
              slot="reference"
              type="success"
              icon="el-icon-check"
              circle
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="resetDialog"
    >
      <el-form label-position="right" label-width="80px" :model="editProject">
        <el-form-item label="Name">
          <el-input v-model="editProject.name" placeholder="使用英文，若有多个英文使用驼峰命名" />
        </el-form-item>
        <el-form-item label="标签名">
          <el-input v-model="editProject.label" placeholder="在工具列表顶部分类展示的文案" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editProject.sort" type="number" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialog">取 消</el-button>
        <el-button type="primary" @click="handleDoneButton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Project } from '@/api/project.js'

export default {
  name: 'Project',
  data() {
    return {
      project: {},
      projects: [],
      dialogVisible: false,
      loading: false,
      editProject: {
        name: '',
        label: '',
        sort: 0
      }
    }
  },
  mounted() {
    this._request_get_project()
  },
  methods: {
    _request_get_project() {
      this.loading = true
      setTimeout(() => {
        Project.get_project().then(response => {
          const { data, code } = response
          if (code === 200) {
            this.projects = data
          }
          this.loading = false
        })
      }, 500)
    },
    _request_create_project() {
      setTimeout(() => {
        Project.create_project(this.editProject).then(response => {
          const { code } = response
          if (code === 200) {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success'
            })
            this._request_get_project()
            this.resetDialog()
          }
        })
      }, 50)
    },
    _request_update_project() {
      setTimeout(() => {
        Project.update_project(this.editProject).then(response => {
          const { code } = response
          if (code === 200) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success'
            })
            this._request_get_project()
            this.resetDialog()
          }
        })
      }, 50)
    },
    _request_delete_project(data) {
      setTimeout(() => {
        Project.delete_project(data).then(response => {
          const { code } = response
          if (code === 200) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this._request_get_project()
            this.resetDialog()
          }
        })
      }, 50)
    },
    handleCreateButton() {
      this.dialogVisible = true
    },
    handleEditButton(data) {
      this.dialogVisible = true
      this.editProject = JSON.parse(JSON.stringify(data))
    },
    handleDeleteButton(data) {
      this._request_delete_project(data)
      this._request_get_project()
    },
    handleDoneButton() {
      if (this.editProject.name === '' || this.editProject.label === '' || this.editProject.sort === '') {
        this.$notify({
          title: '失败',
          message: '请完善信息',
          type: 'warning'
        })
      } else {
        // eslint-disable-next-line no-prototype-builtins
        if (this.editProject.hasOwnProperty('id')) {
          this._request_update_project()
        } else {
          this._request_create_project()
        }
      }
    },
    resetDialog() {
      this.dialogVisible = false
      this.editProject = {
        name: '',
        label: '',
        sort: 0
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div style="margin:20px">
    <el-button
      type="primary"
      @click="handleCreateButton"
    >
      创建分类
    </el-button>
    <el-table
      ref="filterTable"
      v-loading="loading"
      :data="kinds"
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
      <el-form label-position="right" label-width="80px" :model="editKind">
        <el-form-item label="名称">
          <el-input v-model="editKind.name" placeholder="使用英文，若有多个英文使用驼峰命名" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editKind.sort" type="number" />
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
import { Navigation } from '@/api/navigation'

export default {
  name: 'Kind',
  data() {
    return {
      kind: {},
      kinds: [],
      dialogVisible: false,
      loading: false,
      editKind: {
        name: '',
        sort: 0
      }
    }
  },
  mounted() {
    this._request_get()
  },
  methods: {
    _request_get() {
      this.loading = true
      setTimeout(() => {
        Navigation.get_kind().then(response => {
          const { data, code } = response
          if (code === 200) {
            this.kinds = data
          }
          this.loading = false
        })
      }, 500)
    },
    _request_create() {
      setTimeout(() => {
        Navigation.create_kind(this.editKind).then(response => {
          const { code } = response
          if (code === 200) {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success'
            })
            this._request_get()
            this.resetDialog()
          }
        })
      }, 50)
    },
    _request_update() {
      setTimeout(() => {
        Navigation.update_kind(this.editKind).then(response => {
          const { code } = response
          if (code === 200) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success'
            })
            this._request_get()
            this.resetDialog()
          }
        })
      }, 50)
    },
    _request_delete(data) {
      setTimeout(() => {
        Navigation.delete_kind(data).then(response => {
          const { code } = response
          if (code === 200) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this._request_get()
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
      this.editKind = JSON.parse(JSON.stringify(data))
    },
    handleDeleteButton(data) {
      this._request_delete(data)
      this._request_get()
    },
    handleDoneButton() {
      if (this.editKind.name === '' || this.editKind.sort === '') {
        this.$notify({
          title: '失败',
          message: '请完善信息',
          type: 'warning'
        })
      } else {
        // eslint-disable-next-line no-prototype-builtins
        if (this.editKind.hasOwnProperty('id')) {
          this._request_update()
        } else {
          this._request_create()
        }
      }
    },
    resetDialog() {
      this.dialogVisible = false
      this.editKind = {
        name: '',
        sort: 0
      }
    }
  }
}
</script>

<style scoped>

</style>

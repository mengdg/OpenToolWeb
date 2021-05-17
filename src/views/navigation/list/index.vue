<template>
  <div style="margin:20px">
    <el-form>
      <el-form-item>
        <el-button type="primary" class="el-icon-plus" @click="handleCreateButton">新增卡片</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="filterTable"
      v-loading="loading"
      :data="navs"
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
        prop="url"
        label="所属分类"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.kind.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="链接"
        show-overflow-tooltip
      />
      <el-table-column
        prop="state"
        label="状态"
        width="100"
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
        prop="recommend"
        label="是否推荐"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.recommend === 1 ? 'success' : 'info'"
            disable-transitions
          >
            <span v-if="scope.row.recommend === 1">
              推荐
            </span>
            <span v-else>
              未推荐
            </span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="100"
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
      width="50%"
      :before-close="resetDialog"
    >
      <el-form label-position="right" label-width="80px" :model="editNav">
        <el-form-item label="名称">
          <el-input v-model="editNav.name" placeholder="" />
        </el-form-item>
        <el-form-item label="卡片链接">
          <el-input v-model="editNav.url" placeholder="" />
        </el-form-item>
        <el-form-item label="图片链接">
          <el-input v-model="editNav.img" placeholder="" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="editNav.desc" type="textarea" :rows="2" placeholder="" />
        </el-form-item>
        <el-form-item label="分类">
          <template slot-scope="slot">
            <el-select v-model="editNav.kind_id" placeholder="请选择">
              <el-option
                v-for="item in kinds"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-radio v-model="editNav.recommend" :label="0">不推荐</el-radio>
          <el-radio v-model="editNav.recommend" :label="1">推荐</el-radio>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editNav.sort" type="number" />
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
  name: 'Nav',
  data() {
    return {
      nav: {},
      navs: [],
      kinds: [],
      dialogVisible: false,
      loading: false,
      editNav: {
        name: '',
        url: '',
        img: '',
        desc: '',
        kind_id: undefined,
        recommend: 0,
        sort: 0
      }
    }
  },
  mounted() {
    this._requestNavs()
  },
  methods: {
    _request_kinds() {
      Navigation.get_kind().then(response => {
        const { data, code } = response
        if (code === 200) {
          this.kinds = data
        }
        this.loading = false
      })
    },
    _requestNavs() {
      this.loading = true
      Navigation.get_navs().then(response => {
        const { data } = response
        this.navs = data
        this.loading = false
      })
    },
    _request_update() {
      Navigation.update_nav(this.editNav).then(response => {
        const { code } = response
        if (code === 200) {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          })
          this._requestNavs()
          this.resetDialog()
        }
      })
    },
    _request_create() {
      Navigation.create_nav(this.editNav).then(response => {
        const { code } = response
        if (code === 200) {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success'
          })
          this._requestNavs()
          this.resetDialog()
        }
      })
    },
    _request_delete(data) {
      setTimeout(() => {
        Navigation.delete_nav(data).then(response => {
          const { code } = response
          if (code === 200) {
            this.$notify({
              title: '成功',
              message: '执行成功',
              type: 'success'
            })
            this._requestNavs()
            this.resetDialog()
          }
        })
      }, 50)
    },
    handleDoneButton() {
      if (this.editNav.name === '' || this.editNav.sort === '' || this.editNav.url === '' || this.editNav.img === '' || this.editNav.kind_id === undefined) {
        this.$notify({
          title: '失败',
          message: '请完善信息',
          type: 'warning'
        })
      } else {
        // eslint-disable-next-line no-prototype-builtins
        if (this.editNav.hasOwnProperty('id')) {
          this._request_update()
        } else {
          this._request_create()
        }
      }
    },
    handleCreateButton() {
      this._request_kinds()
      this.dialogVisible = true
    },
    handleEditButton(data) {
      this._request_kinds()
      this.dialogVisible = true
      this.editNav = JSON.parse(JSON.stringify(data))
    },
    handleDeleteButton(data) {
      this._request_delete(data)
      this._requestNavs()
    },
    resetDialog() {
      this.dialogVisible = false
      this.editNav = {
        name: '',
        url: '',
        img: '',
        desc: '',
        kind_id: undefined,
        recommend: 0,
        sort: 0
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      <span v-if="selectProject !== ''">所属项目：{{ selectProject }}</span>
      <span v-else>请选择项目</span>
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-border">
      <el-radio-group v-model="selectProject" style="padding: 5px 15px;">
        <el-radio
          v-for="(item, index) in value"
          :key="index"
          :label="item.label"
          :disabled="item.state === 0"
        />
      </el-radio-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      default: () => [],
      type: Array
    },
    project: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    selectProject: {
      get() {
        return this.project
      },
      set(val) {
        this.value.forEach(element => {
          if (element.label === val) {
            this.$emit('input', element)
          }
        })
      }
    }
  },
  mounted() {}
}
</script>

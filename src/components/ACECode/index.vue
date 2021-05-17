<template>
  <div class="ace-container">
    <div ref="ace" class="ace-editor" />
    <!-- <div v-show="toggle" class="config-panel">
      <div>
        <div class="item">
          <label class="title">语言</label>
          <el-select v-model="modePath" size="mini" value-key="name" class="value" @change="handleModelPathChange">
            <el-option
              v-for="mode in modeArray"
              :key="mode.name"
              :label="mode.name"
              :value="mode.path"
            />
          </el-select>
        </div>

        <div class="item">
          <label class="title">换行</label>
          <el-select v-model="wrap" size="mini" value-key="name" class="value" @change="handleWrapChange">
            <el-option
              v-for="wrap1 in wrapArray"
              :key="wrap1.name"
              :label="wrap1.name"
              :value="wrap1.value"
            />
          </el-select>
        </div>
      </div>
    </div> -->

    <!-- <div class="bookmarklet" @click="toggleConfigPanel" /> -->
  </div>
</template>

<script>
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/snippets/css'
import 'ace-builds/src-noconflict/snippets/scss'
import 'ace-builds/src-noconflict/snippets/json'
import 'ace-builds/src-noconflict/snippets/text'
import 'ace-builds/src-noconflict/snippets/python'
import 'ace-builds/src-noconflict/snippets/mysql'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-javascript'

// const themeArray = [{
//   name: 'monokai',
//   path: 'ace/theme/monokai'
// }]

const wrapArray = [{
  name: '开启',
  value: true
}, {
  name: '关闭',
  value: false
}]

const modeArray = [{
  name: 'Python',
  path: 'ace/mode/python'
}, {
  name: 'JavaScript',
  path: 'ace/mode/javascript'
}, {
  name: 'HTML',
  path: 'ace/mode/html'
}, {
  name: 'CSS',
  path: 'ace/mode/css'
}, {
  name: 'SCSS',
  path: 'ace/mode/scss'
}, {
  name: 'Json',
  path: 'ace/mode/json'
}, {
  name: 'Java',
  path: 'ace/mode/java'
}, {
  name: 'Text',
  path: 'ace/mode/text'
}]

export default {
  props: {
    value: { type: String, default: '' }
  },
  data() {
    return {
      aceEditor: null,
      toggle: true,
      wrap: true,
      themePath: 'ace/theme/monokai',
      modePath: 'ace/mode/python',
      modeArray: modeArray,
      wrapArray: wrapArray
    }
  },
  mounted() {
    setTimeout(() => {
      this.aceEditor = ace.edit(this.$refs.ace, {
        maxLines: 35,
        minLines: 25,
        fontSize: 14,
        value: this.value ? this.value : '',
        theme: this.themePath,
        mode: this.modePath,
        wrap: this.wrap,
        tabSize: 4
      })
      // 激活自动提示
      this.aceEditor.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true
      })
      this.aceEditor.getSession().on('change', this.change)
    }, 1000)
  },
  methods: {
    toggleConfigPanel() {
      this.toggle = !this.toggle
    },
    change() {
      this.$emit('input', this.aceEditor.getSession().getValue())
    },
    handleModelPathChange(modelPath) {
      this.aceEditor.getSession().setMode(modelPath)
    },
    handleWrapChange(wrap) {
      this.aceEditor.getSession().setUseWrapMode(wrap)
    }
  }
}
</script>

<style lang='scss' scoped>
.ace-container {
  position: relative;

  .ace-editor {
    height: 100px;
  }

  .config-panel {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 100%;
    overflow: scroll;
    box-shadow: grey -5px 2px 3px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 1;

    .item {
      margin: 10px auto;
      text-align: center;

      .title {
        color: white;
        margin: 0 10px;
        font-size: 14px;
      }
    }
  }

  .bookmarklet {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    z-index: 2;
    cursor: pointer;
    border-width: 9px;
    border-style: solid;
    border-color: lightblue gray gray rgb(206, 173, 230);
    border-image: initial;
  }
}
</style>

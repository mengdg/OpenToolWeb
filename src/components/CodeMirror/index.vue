<template>
  <textarea ref="pythoncode" v-model="code" />
</template>

<script>
const CodeMirror = require('codemirror/lib/codemirror')
// import language js
import 'codemirror/mode/python/python.js'
// import theme style
import 'codemirror/theme/base16-dark.css'
// import more 'codemirror/some-resource...'

export default {
  data() {
    return {
      code: ''
    }
  },
  mounted() {
    const mime = { name: 'python', json: true }
    // let theme = 'ambiance'//设置主题，不设置的会使用默认主题
    const editor = CodeMirror.fromTextArea(this.$refs.pythoncode, {
      mode: mime, // 选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
      tabSize: 4, // tab键缩进4
      indentUnit: 4, // 一个块应该缩进4
      indentWithTabs: true, // 使用制表符进行智能缩进
      lineNumbers: true, // 是否显示行数
      lineWrapping: true, // 在行槽中添加行号显示器、折叠器、语法检测器
      foldGutter: true, // 启用行槽中的代码折叠
      lineWiseCopuCut: true,
      showCursorWhenSelecting: true,
      matchBrackets: true,
      line: true,
      keyMap: 'sublime', // 快键键风格
      autoCloseBrackets: true, // 自动闭合符号
      styleActiveLine: true // 显示选中行的样式
    })
    // 代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
    editor.on('cursorActivity1', function() {
      editor.showHint()
    })
  },
  methods: {}
}
</script>

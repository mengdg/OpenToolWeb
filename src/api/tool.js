import request from '@/utils/request'

function create_tool(data) {
  return request({
    url: '/tool',
    method: 'post',
    data
  })
}

function update_tool(data) {
  return request({
    url: '/tool',
    method: 'put',
    data
  })
}

function delete_tool(id) {
  return request({
    url: '/tool',
    method: 'delete',
    data: { id }
  })
}

function get_tool(id) {
  return request({
    url: '/tool',
    method: 'get',
    params: { tool_id: id }
  })
}

function get_tools(params) {
  return request({
    url: '/tools',
    method: 'get',
    params: params
  })
}

const Tool = {
  create_tool,
  update_tool,
  delete_tool,
  get_tool,
  get_tools
}

export {
  Tool
}


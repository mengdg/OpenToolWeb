import request from '@/utils/request'

function create_visit(tool_id) {
  return request({
    url: '/visit',
    method: 'post',
    data: { tool_id }
  })
}

function get_visit(tool_id) {
  return request({
    url: '/visit',
    method: 'get',
    params: { tool_id }
  })
}

function get_viewer(tool_id) {
  return request({
    url: '/viewer',
    method: 'get',
    params: { tool_id }
  })
}

const Visit = {
  create_visit,
  get_visit,
  get_viewer
}

export {
  Visit
}

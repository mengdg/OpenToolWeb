import request from '@/utils/request'

function create_debugtalk(debugtalk) {
  return request({
    url: '/debugtalk',
    method: 'post',
    data: { debugtalk }
  })
}

function update_debugtalk(data) {
  return request({
    url: '/debugtalk',
    method: 'put',
    data
  })
}

function get_debugtalk(id) {
  return request({
    url: '/debugtalk',
    method: 'put',
    params: { id }
  })
}

const Debugtalk = {
  create_debugtalk,
  update_debugtalk,
  get_debugtalk
}

export {
  Debugtalk
}

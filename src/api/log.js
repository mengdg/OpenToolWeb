import request from '@/utils/request'

function create_log(event, content) {
  return request({
    url: '/logs',
    method: 'post',
    data: { event: event, content: content }
  })
}

function get_log(event) {
  return request({
    url: '/logs',
    method: 'get',
    params: { event }
  })
}

const Logs = {
  create_log,
  get_log
}

export {
  Logs
}

import request from '@/utils/request'

function run(tool_id, variables, params) {
  return request({
    url: '/launch',
    method: 'post',
    data: { tool_id, variables, params }
  })
}

const Launch = {
  run
}

export {
  Launch
}

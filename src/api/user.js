import request from '@/utils/request'

function get_users() {
  return request({
    url: '/users',
    method: 'get'
  })
}

function user_info(user_id) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { user_id }
  })
}

function login(code) {
  return request({
    url: '/user',
    method: 'get',
    params: { code }
  })
}

const User = {
  get_users,
  user_info,
  login
}

export {
  User
}

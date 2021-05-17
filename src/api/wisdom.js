import request from '@/utils/request'

function create_wisdom(text) {
  return request({
    url: '/wisdom',
    method: 'post',
    data: { text }
  })
}

function get_wisdom() {
  return request({
    url: '/wisdom',
    method: 'get'
  })
}

const Wisdom = {
  create_wisdom,
  get_wisdom
}

export {
  Wisdom
}

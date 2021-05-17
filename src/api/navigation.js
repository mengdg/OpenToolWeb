import request from '@/utils/request'

function create_nav(data) {
  return request({
    url: '/navigation',
    method: 'post',
    data
  })
}

function update_nav(data) {
  return request({
    url: '/navigation',
    method: 'put',
    data
  })
}

function delete_nav(data) {
  return request({
    url: '/navigation',
    method: 'delete',
    data
  })
}

function get_nav() {
  return request({
    url: '/navigation',
    method: 'get'
  })
}

function get_navs() {
  return request({
    url: '/navigations',
    method: 'get'
  })
}

function create_kind(data) {
  return request({
    url: '/kind',
    method: 'post',
    data
  })
}

function update_kind(data) {
  return request({
    url: '/kind',
    method: 'put',
    data
  })
}

function delete_kind(data) {
  return request({
    url: '/kind',
    method: 'delete',
    data
  })
}

function get_kind() {
  return request({
    url: '/kind',
    method: 'get'
  })
}

const Navigation = {
  create_nav,
  update_nav,
  delete_nav,
  get_nav,
  get_navs,
  create_kind,
  update_kind,
  delete_kind,
  get_kind
}

export {
  Navigation
}

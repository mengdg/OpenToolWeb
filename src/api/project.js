import request from '@/utils/request'

function create_project(data) {
  return request({
    url: '/project',
    method: 'post',
    data
  })
}

function update_project(data) {
  return request({
    url: '/project',
    method: 'put',
    data
  })
}

function delete_project(data) {
  return request({
    url: '/project',
    method: 'delete',
    data
  })
}

function get_project() {
  return request({
    url: '/project',
    method: 'get'
  })
}

const Project = {
  create_project,
  update_project,
  delete_project,
  get_project
}

export {
  Project
}

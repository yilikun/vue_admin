/* eslint-disable */
import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/admin/agent/commodity/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/v1/admin/agent/commodity/info',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/goods/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/v1/admin/agent/commodity/add',
    method: 'post',
    data:data
  })
}

export function updateArticle(data) {
  return request({
    url: '/v1/admin/agent/commodity/edit',
    method: 'post',
    data : data
  })
}


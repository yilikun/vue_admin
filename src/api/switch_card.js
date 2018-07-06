/* eslint-disable */
import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/admin/transfer/card/list',
    method: 'get',
    params: query
  })
}

export function createArticle(data) {
  return request({
    url: '/v1/admin/transfer/card',
    method: 'post',
    data:data
  })
}


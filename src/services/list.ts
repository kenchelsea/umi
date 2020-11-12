import request from '@/utils/request'

export function getList(data: Object) {
  request('/api/user', {
    params: data,
  })
}
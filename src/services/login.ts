import request from '@/utils/request'
// api接口
const BASE_URL = '/dst-apis'

export function loginDD(data: Object) {
  return request(`${BASE_URL}/sso/apiLogin`, {
    method: 'POST',
    data,
  })
}
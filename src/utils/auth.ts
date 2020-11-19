import cookie from './cookie'

const TokenKey = 'userInfo'

export function getToken() {
  return cookie.get(TokenKey)
}

export function setToken(token: string, day: number = 1) {
  const oneDay = 86400000
  let time = new Date(new Date().getTime() + (oneDay * day)).toUTCString()
  return cookie.put(TokenKey, token, { expireTimes: time})
}

export function removeToken() {
  cookie.clear(TokenKey)
}

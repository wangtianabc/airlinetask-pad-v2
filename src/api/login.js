import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/LoginAction/Login.do',
    method: 'get',
    params: data,
    withCredentials: true
  })
}

export function logoutAction(token) {
  return request({
    url: '/LoginAction/Logout.do',
    method: 'get',
    params: { token },
    withCredentials: true
  })
}

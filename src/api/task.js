import request from '@/utils/request'

export function fetchMyTaskList(query) {
  return request({
    url: '/task/getMyTaskList',
    method: 'get',
    params: query
  })
}

export function fetchMyTask(query) {
  return request({
    url: '/task/getMyTask',
    method: 'get',
    params: query
  })
}

export function fetchTaskItems(query) {
  return request({
    url: '/task/getItemsList',
    method: 'get',
    params: query
  })
}

export function fetchMyTaskInfo(userInfo) {
  return request({
    url: '/AirlineTaskAction/fetchMyTaskInfo.do',
    method: 'get',
    params: userInfo
  })
}

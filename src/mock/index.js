import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import taskAPI from './task'
import matAPI from './mat'

Mock.setup({
  timeout: '600-1000'
})

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 任务相关
Mock.mock(/\/task\/getMyTaskList/, 'get', taskAPI.getMyTaskList)
Mock.mock(/\/task\/getMyTask/, 'get', taskAPI.getMyTask)
Mock.mock(/\/task\/getItemsList/, 'get', taskAPI.getItemsList)

// 航材相关
Mock.mock(/\/mat\/getMatListByPN/, 'get', matAPI.getMatListByPN)

export default Mock

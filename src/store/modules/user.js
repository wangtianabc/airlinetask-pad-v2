import { loginByUsername, logoutAction } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    userId: '',
    status: '',
    code: '',
    token: getToken(),
    login: false,
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOGIN: (state, login) => {
      state.login = login
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.sessionid)
          if (data.rolelist && data.rolelist !== '') {
            commit('SET_ROLES', data.rolelist.split(','))
          }
          commit('SET_NAME', data.realname)
          commit('SET_USERID', data.userid)
          setToken(response.data.sessionid)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logoutAction(state.token).then(response => {
          const data = response.data
          if (data.result === 'success') {
            commit('SET_NAME', '')
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_LOGIN', false)
            removeToken()
            resolve()
          } else {
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user

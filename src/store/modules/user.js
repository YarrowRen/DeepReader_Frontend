import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { updateStuInfo,getQuestionFormByBookId,submitAnswer,viewBook,viewBookAtExam } from '@/api/stu_info'
import {updateUserKWLForm,updateQuestionForm,userDataCount,getUserHeat} from '@/api/user'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  username: '',
  sex: '',
  nation: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
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
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  },
  SET_NATION: (state, nation) => {
    state.nation = nation
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, sex, nation, username } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_SEX', sex)
        commit('SET_NATION', nation)
        commit('SET_USERNAME', username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  //更新学生用户的用户名与密码
  updateStuInfo({ commit, state }, userInfo) {
    const { name, oldPassword, newPassword } = userInfo
    return new Promise((resolve, reject) => {
      updateStuInfo({ name: name, oldPassword: oldPassword, newPassword: newPassword, token: state.token }).then(response => {
          commit('SET_NAME', name)
          alert("success: 用户信息修改成功!")
          location.reload();
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateUserKWLForm({ commit, state }, KWLForm){
    return new Promise((resolve, reject) => {
      updateUserKWLForm(state.token ,KWLForm).then(response => {
          //alert("success: KWL表格提交成功!")
          //location.reload();
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateQuestionForm({ commit, state }, questionForm){
    return new Promise((resolve, reject) => {
      updateQuestionForm(state.token ,questionForm).then(response => {
          //location.reload();
      }).catch(error => {
        reject(error)
      })
    })
  },

  submitAnswer({ commit, state }, answerForm){
    return new Promise((resolve, reject) => {
      submitAnswer(state.token ,answerForm).then(response => {
          //location.reload();
      }).catch(error => {
        reject(error)
      })
    })
  },


  getQuestionFormByBookId({},bookId){
    return new Promise(( resolve,reject) => {
      getQuestionFormByBookId(bookId).then((response) => {
        console.log("test:"+bookId)
        const { data } = response
        if (!data) {
          reject('请求数据失败.')
        }
        resolve(data)
          //location.reload();
      }).catch(error => {
        reject(error)
      })
    })
  },

  viewBook({ commit, state }, bookId) {
    return new Promise((resolve, reject) => {
      viewBook( state.token,bookId ).then(response => {
        const { data } = response
        if (!data) {
          reject('请求数据失败.')
        }
        
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  viewBookAtExam({ commit, state }, bookId) {
    return new Promise((resolve, reject) => {
      viewBookAtExam( state.token,bookId ).then(response => {
        const { data } = response
        if (!data) {
          reject('请求数据失败.')
        }
        
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  userDataCount({ state }) {
    return new Promise((resolve, reject) => {
      userDataCount(state.token).then((response) => {
        const { data } = response
        if (!data) {
          reject('请求数据失败.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUserHeat({state}){
    return new Promise(( resolve,reject) => {
      getUserHeat(state.token).then((response) => {
        const { data } = response
        if (!data) {
          reject('请求数据失败.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

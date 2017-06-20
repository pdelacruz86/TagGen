// import api from '../../api'
import * as types from '../types'
import router from '../../router'

const state = {
  isLoggedIn: !!localStorage.getItem('token')
}

const mutations = {
  [types.LOGIN] (state) {
    state.pending = true
  },
  [types.LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true
    state.pending = false
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false
  }
}

const actions = {
  login ({ commit }, creds) {
    commit(types.LOGIN) // show spinner
    console.log(creds)

    // api.localLogin(creds).then(response => {
    //   if (response.statusText !== 'OK') {
    //     return
    //   }
      // const token = response.data.token
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTg1NzEyNjc4MDh9.TxSQke0Eyht8EipifgZtTfL3CBu6-G6_YJBEmUCPx7o')
      // commit(types.LOGIN_SUCCESS)
      // console.log(response)
    router.push('/')
    // },
    // response => {
    // })
  },
  logout ({ commit }) {
    localStorage.removeItem('token')
    commit(types.LOGOUT)
    router.push('/login')
  }
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  }
}

export default{
  state,
  mutations,
  actions,
  getters
}

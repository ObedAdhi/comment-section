import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'
import Swal from 'sweetalert2'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allComments: [],
    loginPage: 'login',
    loginStatus: ''
  },
  mutations: {
    changeLoginPage (state, payload) {
      state.loginPage = payload
    },
    changeLoginStatus (state, payload) {
      state.loginStatus = payload
    },
    insertAllComments (state, payload) {
      state.allComments = payload
    }
  },
  actions: {
    login (context, payload) {
      const { email, password } = payload
      console.log(email, password)
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email, password
        }
      })
        .then(data => {
          console.log(data.data.access_token)
          localStorage.setItem('access_token', data.data.access_token)
          Swal.fire({
            icon: 'success',
            title: 'Login Success'
          })
          this.commit('changeLoginStatus', 'true')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: err.response.data.message
          })
        })
    },
    register (context, payload) {
      const { email, password } = payload
      console.log(email, password)
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email, password
        }
      })
        .then(data => {
          console.log(data.data.access_token)
          localStorage.setItem('access_token', data.data.access_token)
          Swal.fire({
            icon: 'success',
            title: 'Register Success'
          })
          this.commit('changeLoginStatus', 'true')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: err.response.data.message
          })
        })
    }
  }
})

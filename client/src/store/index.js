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
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email, password
        }
      })
        .then(data => {
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
      const { email, name, password } = payload
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email, name, password
        }
      })
        .then(data => {
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
    },
    getAllComments (context) {
      const access_token = localStorage.getItem('access_token')
      axios({
        method: 'GET',
        url: '/comments',
        headers: {
          access_token
        }
      })
        .then(data => {
          this.commit('insertAllComments', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createComment (context, payload) {
      const { commentValue } = payload
      const access_token = localStorage.getItem('access_token')
      console.log(commentValue)
      axios({
        method: 'POST',
        url: '/comments',
        headers: {
          access_token
        },
        data: {
          commentValue
        }
      })
        .then(data => {
          Swal.fire({
            icon: 'success',
            title: 'Your comment has been added'
          })
          this.dispatch('getAllComments')
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
    createReply (context, payload) {
      const { replyValue } = payload
      const access_token = localStorage.getItem('access_token')
      console.log(replyValue)
      axios({
        method: 'POST',
        url: '/replies',
        headers: {
          access_token
        },
        data: {
          replyValue
        }
      })
        .then(data => {
          Swal.fire({
            icon: 'success',
            title: 'Your reply has been added'
          })
          this.dispatch('getAllComments')
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
    deleteComment (context, payload) {
      const { id } = payload
      const access_token = localStorage.getItem('access_token')
      axios({
        method: 'DELETE',
        url: `/comments/${id}`,
        headers: {
          access_token
        }
      })
        .then(data => {
          Swal.fire({
            icon: 'success',
            title: 'Comment deleted'
          })
          this.dispatch('getAllComments')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: err.response.data.message
          })
        })
    },
    deleteReply (context, payload) {
      const { id } = payload
      const access_token = localStorage.getItem('access_token')
      axios({
        method: 'DELETE',
        url: `/replies/${id}`,
        headers: {
          access_token
        }
      })
        .then(data => {
          Swal.fire({
            icon: 'success',
            title: 'Reply deleted'
          })
          this.dispatch('getAllComments')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: err.response.data.message
          })
        })
    }
  }
})

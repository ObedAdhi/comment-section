import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://simple-comment-section.herokuapp.com'
})

export default instance

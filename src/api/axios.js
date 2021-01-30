import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'http://37.46.130.143/api'

axios.interceptors.request.use(config => {
  const token = getItem('accessToken')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

export default axios

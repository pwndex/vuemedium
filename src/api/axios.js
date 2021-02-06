import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'
// https://conduit.productionready.io/api
// http://37.46.130.143/api
axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use(config => {
  const token = getItem('accessToken')
  config.headers.Authorization = token ? `Token ${token}` : ''
  return config
})

export default axios

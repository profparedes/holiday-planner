import axios from 'axios'
import { config } from 'config/config'

const Api = axios.create({
  baseURL: config.api.baseUrl,
})

export default Api

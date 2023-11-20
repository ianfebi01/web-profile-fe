import axios from 'axios'
import Cookies from 'universal-cookie'

const cookie = new Cookies()

const api = axios.create({
  baseURL: '/api-web', // Replace with your API base URL
})

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Modify the request config here (add headers, authentication tokens)

    console.log(cookie.get('accessToken'))
    
    const accessToken = cookie.get('accessToken')

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error)
  }
)
// End of Request interceptor

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error)
  }
)
// End of Response interceptor

export default api

import axios from 'axios'
import { getCookie } from './Cookie'

export default axios.create({
  headers: {
          accessToken: `Bearer ${getCookie("is_login")}`,
          refreshToken: `${getCookie("is_login2")}`,
        }
})
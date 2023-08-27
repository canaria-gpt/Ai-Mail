import axios from 'axios'
import { getCookie } from './Cookie'

export default axios.create({
  headers: {
          Authorization: `Bearer ${getCookie("is_login")}`,
        }
})
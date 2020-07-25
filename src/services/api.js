import axios from 'axios'
import {
  setLocalStorage,
  getLocalStorage,
  USER_DATA_KEY,
  TOKEN_KEY,
} from './localStorage'

const axiosInstance = () => {
  const token = getLocalStorage(TOKEN_KEY)
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  return axios.create({
    baseURL: `${process.env.GATSBY_STRAPI_API_URL}`,
    timeout: 10000,
    headers,
  })
}

/**
 * Sign the user up
 * @param values The user information
 */
export const signUp = async values => {
  return axiosInstance().post('/auth/local/register', values)
}

export const signin = async ({ identifier, password }) => {
  const { data } = await axiosInstance().post(`/auth/local`, {
    identifier,
    password,
  })

  setLocalStorage(TOKEN_KEY, data.jwt)
  setLocalStorage(USER_DATA_KEY, JSON.stringify(data.user))

  return data
}

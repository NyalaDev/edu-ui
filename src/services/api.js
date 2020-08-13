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
  const params = {
    baseURL: `${process.env.GATSBY_STRAPI_API_URL}`,
    timeout: 10000,
  }
  if (headers) {
    params.headers = headers
  }
  return axios.create(params)
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

export const getProfile = async userId => {
  return axiosInstance().get(`/profiles/${userId}`)
}

export const addProfile = async values => {
  const { data } = await axiosInstance().post(`/profiles`, values)
  return data
}

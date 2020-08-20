import axios from 'axios'
import { appConfig } from '../common/config'
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
    baseURL: appConfig.strapiURL,
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

export const getProfile = async () => {
  return axiosInstance().get(`/profiles/`)
}

export const addProfile = async values => {
  const { data } = await axiosInstance().put(`/profiles`, values)
  return data
}

/**
 * Upload file to strapi media
 * @param {*} file The file object
 */
export const uploadFile = async file => {
  const formData = new FormData()
  formData.append('files', file)
  const { data } = await axiosInstance().post(`/upload`, formData)
  return data
}

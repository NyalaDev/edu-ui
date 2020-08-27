import axios from 'axios'
import { appConfig } from '../common/config'
import { getLocalStorage } from './localStorage'
import { LOCALE_STORAGE_TOKEN } from '../common/const'

const axiosInstance = () => {
  const token = getLocalStorage(LOCALE_STORAGE_TOKEN)
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
  return data
}

export const getProfile = async () => {
  return axiosInstance().get(`/profiles/`)
}

/**
 * Get a single profile by its id
 * @param {*} id the profile id
 */
export const getProfileById = async id => {
  return axiosInstance().get(`/profiles/${id}`)
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

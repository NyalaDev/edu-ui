import axios from 'axios'
import { appConfig } from '../common/config'
import { getLocalStorage } from './localStorage'
import { LOCALE_STORAGE_TOKEN } from '../common/constants'

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
export const signUp = async values =>
  axiosInstance().post('/auth/local/register', values)

export const signin = async ({ identifier, password }) => {
  const { data } = await axiosInstance().post(`/auth/local`, {
    identifier,
    password,
  })
  return data
}

export const getProfile = async () => axiosInstance().get(`/profiles/`)

/**
 * Get a single profile by its id
 * @param {*} id the profile id
 */
export const getProfileById = async id => axiosInstance().get(`/profiles/${id}`)

export const addProfile = async values => {
  const { data } = await axiosInstance().put(`/profiles`, values)
  return data
}
export const addPRToReview = async values => {
  const { data } = await axiosInstance().post(`/prs`, values)
  return data
}

export const forgotPassword = async values => {
  const { data } = await axiosInstance().post(`/auth/forgot-password`, values)
  return data
}

export const resetPassword = async values => {
  const { data } = await axiosInstance().post(`/auth/reset-password`, values)
  return data
}

export const subscribeToMailingList = async values => {
  const { data } = await axiosInstance().post(
    `https://barmga-lambda.nyaladev.com/email-subscribe`,
    values
  )
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

export const teacher = {
  getTags: async () => axiosInstance().get('/tags'),
  listLanguages: async () => axiosInstance().get('/languages'),
  listCourses: async () =>
    axiosInstance().get('/teacher?_sort=status,created_at:desc'),
  getCourseDetails: async slug => axiosInstance().get(`/teacher/${slug}`),
  saveCourse: async course => axiosInstance().post(`/courses`, course),
  updateCourse: async (course, courseId) =>
    axiosInstance().put(`/courses/${courseId}`, course),
  patchCourse: async (data, courseId) =>
    axiosInstance().put(`/courses/${courseId}`, data),
  saveLecture: async lecture => axiosInstance().post('/lectures', lecture),
  deleteLecture: async id => axiosInstance().delete(`/lectures/${id}`),
}

import axios from 'axios'
import { appConfig } from '../common/config'
import { getLocalStorage } from './localStorage'
import { LOCALE_STORAGE_TOKEN } from '../common/constants'
import {
  UserSignupData,
  UserSigninData,
  UserSigninResponse,
  Profile,
  UserForgotPasswordData,
  UserResetPasswordData,
  UserSubscribeToMailingList,
  UserPrToReviewData,
} from '../types/api.types'

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
export const signUp = async (
  values: UserSignupData
): Promise<UserSigninResponse> => {
  const { data } = await axiosInstance().post('/auth/local/register', values)
  return data
}

export const signin = async (
  values: UserSigninData
): Promise<UserSigninResponse> => {
  const { data } = await axiosInstance().post(`/auth/local`, values)
  return data
}

export const getProfile = async (): Promise<Profile> =>
  axiosInstance().get(`/profiles/`)

/**
 * Get a single profile by its id
 * @param {*} id the profile id
 */
export const getProfileById = async (id: number) =>
  axiosInstance().get(`/profiles/${id}`)

export const addProfile = async (values: Partial<Profile>) => {
  const { data } = await axiosInstance().put(`/profiles`, values)
  return data
}
export const addPRToReview = async (values: UserPrToReviewData) => {
  const { data } = await axiosInstance().post(`/prs`, values)
  return data
}

export const forgotPassword = async (values: UserForgotPasswordData) => {
  const { data } = await axiosInstance().post(`/auth/forgot-password`, values)
  return data
}

export const resetPassword = async (values: UserResetPasswordData) => {
  const { data } = await axiosInstance().post(`/auth/reset-password`, values)
  return data
}

export const addRating = async values => {
  const { data } = await axiosInstance().post(`/ratings`, values)
  return data
}

export const subscribeToMailingList = async (
  values: UserSubscribeToMailingList
) => {
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
export const uploadFile = async (file: any) => {
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
  importFromYoutube: async lecture =>
    axiosInstance().post('/lectures/import', lecture),
  deleteLecture: async id => axiosInstance().delete(`/lectures/${id}`),
}

import axios, { AxiosRequestConfig } from 'axios'
import { appConfig } from '../common/config'
import { getTokenFromCookie } from './cookie.service'
import {
  UserSignupData,
  UserSigninData,
  UserSigninResponse,
  Profile,
  UserForgotPasswordData,
  UserResetPasswordData,
  UserSubscribeToMailingList,
  UserPrToReviewData,
  CourseRating,
  Question,
} from '../types/api.types'

const axiosInstance = () => {
  const token = getTokenFromCookie()
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  const params: AxiosRequestConfig = {
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
export const getProfileById = async (id: number): Promise<{ data: Profile }> =>
  axiosInstance().get(`/profiles/${id}`)

export const addProfile = async (
  values: Partial<Profile>
): Promise<Profile> => {
  const { data } = await axiosInstance().put(`/profiles`, values)
  return data
}

export const deleteProfile = async (): Promise<{ data: Profile }> =>
  axiosInstance().delete(`/profiles`)

export const addPRToReview = async (
  values: UserPrToReviewData
): Promise<UserPrToReviewData> => {
  const { data } = await axiosInstance().post(`/prs`, values)
  return data
}

export const forgotPassword = async (
  values: UserForgotPasswordData
): Promise<VoidFunction> => {
  return axiosInstance().post(`/auth/forgot-password`, values)
}

export const resetPassword = async (
  values: UserResetPasswordData
): Promise<VoidFunction> => {
  return axiosInstance().post(`/auth/reset-password`, values)
}

export const addRating = async (
  values: CourseRating
): Promise<CourseRating> => {
  const { data } = await axiosInstance().post(`/ratings`, values)
  return data
}

export const subscribeToMailingList = async (
  values: UserSubscribeToMailingList
): Promise<{ result: string }> => {
  const { data } = await axiosInstance().post(
    `https://barmga-lambda.nyaladev.com/email-subscribe`,
    values
  )
  return data
}

export const getQuestions = async (): Promise<Question[]> => {
  const { data } = await axiosInstance().get(`/questions`)
  return data
}

export const addQuestion = async (
  values: Partial<Question>
): Promise<Question> => {
  const { data } = await axiosInstance().post(`/questions`, values)
  return data
}

export const updateQuestion = async (
  questionId: number,
  values: Partial<Question>
): Promise<Question> => {
  const { data } = await axiosInstance().put(`/questions/${questionId}`, values)
  return data
}

/**
 * Upload file to strapi media
 * @param {*} file The file object
 */
export const uploadFile = async (file: File): Promise<never[]> => {
  const formData = new FormData()
  formData.append('files', file)
  const { data } = await axiosInstance().post(`/upload`, formData)
  return data
}

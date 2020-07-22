import axios from 'axios'

const axiosInstance = () => {
  return axios.create({
    baseURL: `${process.env.GATSBY_STRAPI_API_URL}`,
  })
}

/**
 * Sign the user up
 * @param values The user information
 */
export const signUp = async values => {
  return axiosInstance().post('/auth/local/register', values)
}

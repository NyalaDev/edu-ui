import { useContext } from 'react'
import queryString from 'query-string'
import axios, { AxiosError } from 'axios'
import { navigate } from 'gatsby'
import { appConfig } from '../common/config'
import { AuthContext } from '../contexts/AuthContext'
import { isBrowser } from './localStorage'

export const handleAuthentication = async (
  provider = 'github',
  language = 'ar'
): Promise<undefined> => {
  if (!isBrowser) {
    return
  }
  // FixMe: investigate this component, it doesn't look it's working properly
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setCurrentUser, setAuthToken } = useContext(AuthContext)
  const callBackParams = queryString.parse(window.location.search)
  // If callback error or user canceled then redirect the user back to the login screen
  if (callBackParams.error) {
    navigate(`/${language}/signin`)
    return
  }
  const requestURL = `${appConfig.strapiURL}/auth/${provider}/callback`
  try {
    const { data } = await axios.get(requestURL, { params: callBackParams })
    if (data.user && data.jwt) {
      setCurrentUser(data.user)
      setAuthToken(data.jwt)
      navigate('/')
    }
  } catch (e) {
    //
  }
}
export const extractErrorMessage = (err: AxiosError): string => {
  try {
    const { response } = err
    const { data } = response as { data: { message: string } }
    return data.message
  } catch (error) {
    return 'Something went wrong'
  }
}

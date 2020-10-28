import { useContext } from 'react'
import queryString from 'query-string'
import axios from 'axios'
import { navigate } from 'gatsby'
import { appConfig } from '../common/config'
import { AuthContext } from '../contexts/AuthContext'
import { isBrowser } from './localStorage'

export const handleAuthentication = async (provider = 'github') => {
  if (!isBrowser) {
    return
  }
  const { setCurrentUser, setAuthToken } = useContext(AuthContext)
  const callBackParams = queryString.parse(window.location.search)
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

export const extractErrorMessage = err => {
  try {
    const { response } = err
    const { data } = response
    return data.message
  } catch (error) {
    return 'Something went wrong'
  }
}

import queryString from 'query-string'
import axios from 'axios'
import { navigate } from 'gatsby'
import {
  setLocalStorage,
  TOKEN_KEY,
  USER_DATA_KEY,
  isBrowser,
} from './localStorage'

export const handleAuthentication = async (url, provider = 'github') => {
  if (!isBrowser) {
    return
  }
  console.log('In here')
  const callBackParams = queryString.parse(window.location.search)

  const requestURL = `${url}/auth/${provider}/callback`
  const { data } = await axios.get(requestURL, { params: callBackParams })

  if (data.jwt) {
    setLocalStorage(TOKEN_KEY, data.jwt)
    setLocalStorage(USER_DATA_KEY, JSON.stringify(data.user))
    navigate('/signin')
  }
}

import { useState } from 'react'
import { setLocalStorage, clearLocalStorage } from '../services/localStorage'
import { LOCALE_STORAGE_USER, LOCALE_STORAGE_TOKEN } from '../common/constants'

/**
 * Custom hook used as a helper to handle authentication status
 * @param {*} initialUser user object can be passed
 */
const useAuthHandler = (initialUser = {}, initialToken = '') => {
  const [user, setUser] = useState(initialUser)
  const [token, setToken] = useState(initialToken)

  /**
   * Store/Clear the current user value
   * Presist the user to the locale storage
   * @param {*} user The user object
   */
  const setCurrentUser = (authUser = null) => {
    if (!authUser) {
      clearLocalStorage(LOCALE_STORAGE_USER)
      setUser({})
      return
    }
    setLocalStorage(LOCALE_STORAGE_USER, JSON.stringify(authUser))
    setUser(authUser)
  }

  /**
   * Store/Clear JWT
   * @param {*} authToken The token
   */
  const setAuthToken = (authToken = null) => {
    if (!authToken) {
      clearLocalStorage(LOCALE_STORAGE_TOKEN)
      setToken('')
    }
    setLocalStorage(LOCALE_STORAGE_TOKEN, authToken)
    setToken(authToken)
  }

  return {
    currentUser: user,
    setCurrentUser,
    authToken: token,
    setAuthToken,
  }
}

export default useAuthHandler

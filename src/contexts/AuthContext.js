import React, { createContext } from 'react'
import { isEmpty } from 'lodash'
import useAuthHandler from '../hooks/useAuthHandler'
import { getLocalStorage, clearLocalStorage } from '../services/localStorage'
import { LOCALE_STORAGE_USER } from '../common/constants'
import { isTeacher } from '../common/util'
import {
  getTokenFromCookie,
  removeAuthCookie,
} from '../services/cookie.service'

/**
 * Helper function to get user from locale storage if exists
 */
const getUserFromLocaleStorageIfAny = () => {
  const user = getLocalStorage(LOCALE_STORAGE_USER)
  return user ? JSON.parse(user) : {}
}

export const AuthContext = createContext({
  isLoggedIn: false,
  isTeacher: false,
  currentUser: {},
  setCurrentUser: () => {},
  authToken: '',
  setAuthToken: () => {},
  logout: () => {},
})

/**
 * Auth Context Provider
 */
export const AuthProvider = ({ children }) => {
  const {
    currentUser,
    setCurrentUser,
    authToken,
    setAuthToken,
  } = useAuthHandler(getUserFromLocaleStorageIfAny(), getTokenFromCookie())

  const logUserOut = () => {
    setCurrentUser({})
    setAuthToken('')
    clearLocalStorage(LOCALE_STORAGE_USER)
    removeAuthCookie()
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !isEmpty(currentUser),
        isTeacher: isTeacher(currentUser),
        currentUser,
        setCurrentUser,
        authToken,
        setAuthToken,
        logout: logUserOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

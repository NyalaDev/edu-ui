import React, { createContext } from 'react'
import { isEmpty } from 'lodash'
import useAuthHandler from '../hooks/useAuthHandler'
import { getLocalStorage } from '../services/localStorage'
import { LOCALE_STORAGE_USER, LOCALE_STORAGE_TOKEN } from '../common/const'
import { isTeacher } from '../common/util'

/**
 * Helper function to get user from locale storage if exists
 */
const getUserFromLocaleStorageIfAny = () => {
  const user = getLocalStorage(LOCALE_STORAGE_USER)
  return user ? JSON.parse(user) : {}
}

/**
 * Helper function to get jwt from locale storage if exists
 */
const getTokenFromLocaleStorageIfAny = () => {
  return getLocalStorage(LOCALE_STORAGE_TOKEN) || ''
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
  } = useAuthHandler(
    getUserFromLocaleStorageIfAny(),
    getTokenFromLocaleStorageIfAny()
  )

  const logUserOut = () => {
    setCurrentUser({})
    setAuthToken('')
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

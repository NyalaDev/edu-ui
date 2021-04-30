import React, { createContext } from 'react'
import { isEmpty } from 'lodash'
import useAuthHandler from '../hooks/useAuthHandler'
import { getLocalStorage } from '../services/localStorage'
import { LOCALE_STORAGE_USER, LOCALE_STORAGE_TOKEN } from '../common/constants'
import { isTeacher } from '../common/util'
import { User } from '../types/api.types'
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
const getTokenFromLocaleStorageIfAny = () =>
  getLocalStorage(LOCALE_STORAGE_TOKEN) || ''

type AuthContextType = {
  isLoggedIn: boolean
  isTeacher: boolean
  currentUser: User | null
  setCurrentUser: (authUser?: User | null) => void
  authToken: string | null
  setAuthToken: (authToken?: string | null) => void
  logout: VoidFunction
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isTeacher: false,
  currentUser: null,
  setCurrentUser: () => {},
  authToken: '',
  setAuthToken: () => {},
  logout: () => {},
})
/**
 * Auth Context Provider
 */
export const AuthProvider: React.FC = ({ children }) => {
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
    setCurrentUser(null)
    setAuthToken(null)
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

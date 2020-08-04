export const isBrowser = typeof window !== 'undefined'

export const LANG_KEY = 'siteLang'
export const USER_DATA_KEY = 'userData'
export const TOKEN_KEY = 'token'

export const getLocalStorage = key => {
  if (!isBrowser) return null
  return localStorage.getItem(key)
}

export const setLocalStorage = (key, value) => {
  if (!isBrowser) return
  localStorage.setItem(key, value)
}

export const clearLocalStorage = key => {
  if (!isBrowser) return
  localStorage.removeItem(key)
}

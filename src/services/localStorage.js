export const isBrowser = typeof window !== 'undefined'

export const USER_DATA_KEY = 'userData'
export const TOKEN_KEY = 'token'

export const getLocalStorage = key => {
  if (!isBrowser) return
  return window.localStorage.getItem(key)
}

export const setLocalStorage = (key, value) => {
  if (!isBrowser) return
  return window.localStorage.setItem(key, value)
}

export const clearLocalStorage = key => {
  if (!isBrowser) return
  return window.localStorage.removeItem(key)
}

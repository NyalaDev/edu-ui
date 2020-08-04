import {
  getLocalStorage,
  TOKEN_KEY,
  USER_DATA_KEY,
  isBrowser,
} from './localStorage'

export const getYoutubeThumbnail = url => {
  if (url && url.match(/youtube/)) {
    const id = url.match(/v=(.+)$/)[1]

    return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`
  }
  return ''
}

export const isLoggedIn = () => {
  return getLocalStorage(TOKEN_KEY) || false
}

export const getUser = () => {
  const user = getLocalStorage(USER_DATA_KEY)
  return isBrowser && user ? JSON.parse(user) : {}
}

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
}

const user = getLocalStorage(USER_DATA_KEY)

export const isLoggedIn = () => {
  return getLocalStorage(TOKEN_KEY) ? true : false
}

export const getUser = () => (isBrowser && user ? JSON.parse(user) : {})

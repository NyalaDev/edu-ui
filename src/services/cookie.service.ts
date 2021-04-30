import Cookies from 'universal-cookie'

const isProduction = process.env.NODE_ENV === 'production'
const COOKIE_NAME = '_barmaga_token'

/**
 * Convert days to milliseconds
 * @param  days Days numer
 * @returns days in milliseconds
 */
const days2Milliseconds = (days = 1) => 60 * 60 * 24 * days

/**
 * Save the JWT token to a cookie
 * @param  token the JWT
 * @returns
 */
export const saveTokenToCookie = (token: string): boolean => {
  try {
    const domain = process.env.GATSBY_COOKIE_DOMAIN || '.barmaga.io'

    const cookies = new Cookies()
    cookies.set(COOKIE_NAME, token, {
      path: '/',
      secure: isProduction,
      maxAge: days2Milliseconds(30),
      domain,
      // sameSite: 'lax',
    })

    return true
  } catch (e) {
    return false
  }
}

/**
 * Remove the auth cookie
 */
export const removeAuthCookie = (): void => {
  const cookies = new Cookies()
  cookies.remove(COOKIE_NAME)
}

/**
 * get the JWt from cookie
 * @returns the JWT token
 */
export const getTokenFromCookie = (): string => {
  const cookies = new Cookies()
  return cookies.get(COOKIE_NAME) || ''
}

import { AppLocale } from '../types/api.types'

export const AppLocales: Array<AppLocale> = ['en', 'ar', 'am', 'sw']

const appConfig = {
  strapiURL: process.env.GATSBY_STRAPI_API_URL || 'http://localhost:1437',
}
export { appConfig }

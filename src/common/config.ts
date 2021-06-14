import { AppLocale } from '../types/api.types'

export const AppLocales: Array<AppLocale> = ['en', 'ar', 'am', 'sw']

const appConfig = {
  strapiURL: process.env.GATSBY_STRAPI_API_URL || 'http://localhost:1437',
  dashboardURL:
    process.env.GATSBY_DASHBOARD_URL || 'https://edu-dashboard.barmaga.io',
  algolia: {
    appId: process.env.GATSBY_ALGOLIA_APP_ID || '',
    searchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY || '',
  },
}
export { appConfig }

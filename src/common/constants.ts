import { AppLocale } from '../types/api.types'

export const DEFAULT_PROFILE_PIC =
  'https://cdn.nyaladev.com/barmaga.io/profiles/default-user.png'
export const LOCALE_STORAGE_USER = 'AuthUser'

export const LOCALE_STORAGE_TOKEN = 'AuthToken'

export const DEFAULT_LANGUAGE = 'siteLang'

type AppLanguage = { label: string; locale: AppLocale; icon: string }

export const appLanguages: Array<AppLanguage> = [
  {
    label: 'العربية',
    locale: 'ar',
    icon: 'sd.svg',
  },
  {
    label: 'English',
    locale: 'en',
    icon: 'au.svg',
  },
  {
    label: 'አማርኛ',
    locale: 'am',
    icon: 'et.svg',
  },
  {
    label: 'Swahili',
    locale: 'sw',
    icon: 'sw.svg',
  },
]
export const getOriginalLanguageName = (locale: string): string | undefined => {
  const language = appLanguages.find(lang => lang.locale === locale)
  return language?.label
}

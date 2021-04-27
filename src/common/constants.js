export const DEFAULT_PROFILE_PIC =
  'https://cdn.nyaladev.com/barmaga.io/profiles/default-user.png'

export const LOCALE_STORAGE_USER = 'AuthUser'

export const LOCALE_STORAGE_TOKEN = 'AuthToken'

export const DEFAULT_LANGUAGE = 'siteLang'

export const appLanguages = [
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

export const getOriginalLanguageName = locale => {
  const language = appLanguages.find(lang => lang.locale === locale) || {}
  return language.label
}

export const ALLOWED_LECTURES_WHEN_NOT_LOGGED_IN = 4

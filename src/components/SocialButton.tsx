import React from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { appConfig } from '../common/config'
import useLanguage from '../hooks/useLanguage'

const COLORS = {
  GitHub: {
    background: 'bg-gray-900',
    className: 'text-white',
    Icon: FaGithub,
  },
  Google: {
    background: 'bg-red-700',
    className: 'text-white',
    Icon: FaGoogle,
  },
}
export type SocialProvider = 'Google' | 'GitHub'
type SocialButtonProps = {
  provider: SocialProvider
}
const SocialButton: React.FC<SocialButtonProps> = ({ provider }) => {
  const { background, className, Icon } = COLORS[provider]
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  return (
    <div className={` ${background} p-2 mt-2 mb-2 rounded-lg cursor-pointer`}>
      <a
        href={`${appConfig.strapiURL}/connect/${provider.toLowerCase()}`}
        className={`flex items-center justify-center ${className}`}
      >
        <span className={`${isRtl ? 'ml-1' : 'mr-2'}`}>
          <Icon />
        </span>
        <span>{t('socialSignIn', { provider })}</span>
      </a>
    </div>
  )
}
export default SocialButton

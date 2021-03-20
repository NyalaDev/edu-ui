import React from 'react'
import PropTypes from 'prop-types'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { appConfig } from '../common/config'
import useLanguage from '../hooks/useLanguage'

const COLORS = {
  github: {
    background: 'bg-gray-900',
    className: 'text-white',
    Icon: FaGithub,
  },
  google: {
    background: 'bg-red-700',
    className: 'text-white',
    Icon: FaGoogle,
  },
}

const SocialButton = ({ provider }) => {
  const { background, className, Icon } = COLORS[provider.toLowerCase()]
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

SocialButton.propTypes = {
  provider: PropTypes.oneOf(['Google', 'GitHub']).isRequired,
}

export default SocialButton

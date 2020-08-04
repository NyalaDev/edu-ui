import React from 'react'
import PropTypes from 'prop-types'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { appConfig } from '../common/config'

const COLORS = {
  github: {
    background: 'bg-gray-900',
    className: 'text-gray-500',
    Icon: FaGithub,
  },
  google: {
    background: 'bg-red-700',
    className: 'text-gray-200',
    Icon: FaGoogle,
  },
}

const SocialButton = ({ provider }) => {
  const { background, className, Icon } = COLORS[provider.toLowerCase()]
  const { t } = useTranslation()

  return (
    <div className={` ${background}  p-2 mt-2 mb-2 rounded-lg cursor-pointer`}>
      <a
        href={`${appConfig.strapiURL}/connect/${provider.toLowerCase()}`}
        className={`flex items-center justify-center ${className}`}
      >
        <span className="mr-1">
          <Icon />
        </span>
        <span>{t('socialSignIn', { provider })}</span>
      </a>
    </div>
  )
}

SocialButton.propTypes = {
  provider: PropTypes.oneOf(['Google', 'GitHub']),
}

export default SocialButton

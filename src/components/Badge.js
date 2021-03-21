import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'gatsby-plugin-react-i18next'
import Clickable from './Clickable'

const Badge = ({
  link,
  text,
  color: colorToUse,
  languageBadge,
  closable,
  onClose,
}) => {
  const Wrapper = link ? Link : React.Fragment
  const WrapperProps = link ? { to: link } : {}

  const color =
    (languageBadge ? `language-${languageBadge}` : colorToUse) || 'gray-400'

  return (
    <div className="m-1">
      <Wrapper {...WrapperProps}>
        <span
          className={`px-2 bg- py-1 text-white bg-${color} rounded-md ${
            closable && 'flex items-center justify-between'
          }`}
        >
          {closable && (
            <Clickable onClick={onClose}>
              <AiOutlineClose />
            </Clickable>
          )}
          <span>{text}</span>
        </span>
      </Wrapper>
    </div>
  )
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  link: PropTypes.string,
  languageBadge: PropTypes.string,
}
Badge.defaultProps = {
  color: 'gray-600',
  closable: false,
  onClose: () => {},
  link: '',
  languageBadge: '',
}

export default Badge

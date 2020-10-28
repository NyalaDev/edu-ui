import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'gatsby'
import Clickable from './Clickable'

const Badge = ({ link, text, color, closable, onClose }) => {
  const Wrapper = link ? Link : React.Fragment
  const WrapperProps = link ? { to: link } : {}
  return (
    <div className="m-1">
      <Wrapper {...WrapperProps}>
        <span
          className={`text-white px-2 py-1 bg-${color} rounded-md ${
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
}
Badge.defaultProps = {
  color: 'gray-600',
  closable: false,
  onClose: () => {},
  link: '',
}

export default Badge

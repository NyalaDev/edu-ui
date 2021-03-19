/* eslint-disable react/button-has-type */
import React from 'react'
import PropTypes from 'prop-types'

const colors = {
  info: 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200',
  error: 'text-white bg-red-600',
  success: 'text-white bg-green-600',
}

const getClasses = props => {
  const classes = []
  const { mode = 'info', extraClasses, type, small } = props
  if (type === 'submit') {
    classes.push(
      'w-full bg-gray-800 text-white text-center hover:bg-gray-900 font-bold uppercase text-md px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none my-3'
    )
  } else {
    classes.push(
      `w-full flex items-center cursor-pointer justify-center border border-transparent text-base rounded-md`
    )
    classes.push(colors[mode])
    if (small) {
      classes.push('p-1')
    } else classes.push('px-8 py-3 md:py-4 md:text-lg md:px-10')
  }
  if (extraClasses) classes.push(extraClasses)
  return classes
}
const Button = props => {
  const { link, children } = props
  const classNames = getClasses(props).join(' ')
  if (link) {
    return (
      <a className={classNames} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  mode: PropTypes.oneOf(['info', 'error', 'success']).isRequired,
  link: PropTypes.bool,
  extraClasses: PropTypes.string,
  small: PropTypes.bool,
  type: PropTypes.oneOf(['submit', '']),
}

Button.defaultProps = {
  link: false,
  extraClasses: '',
  small: false,
  type: '',
}

export default Button

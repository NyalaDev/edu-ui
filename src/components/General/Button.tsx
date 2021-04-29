/* eslint-disable react/button-has-type */
import React from 'react'

const colors = {
  info: 'text-indigo-800 bg-indigo-100 hover:bg-indigo-200',
  error: 'text-white bg-red-600',
  success: 'text-white bg-green-600',
}
const getClasses = (props: Partial<ButtonProps>) => {
  const classes = []
  const { mode, extraClasses, type, small } = props
  if (type === 'submit') {
    classes.push(
      'w-full bg-gray-800 text-white text-center hover:bg-gray-900 font-bold uppercase text-md px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none my-3'
    )
  } else {
    classes.push(
      `w-full flex items-center cursor-pointer justify-center border border-transparent text-base rounded-md`
    )
    if (mode) {
      classes.push(colors[mode])
    }
    if (small) {
      classes.push('p-1')
    } else classes.push('px-8 py-3 md:py-4 md:text-lg md:px-10')
  }
  if (extraClasses) classes.push(extraClasses)
  return classes
}
type ButtonProps = {
  mode: 'info' | 'error' | 'success'
  link?: boolean
  extraClasses?: string
  small?: boolean
  type?: 'submit' | undefined
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const Button: React.FC<ButtonProps> = props => {
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

export default Button

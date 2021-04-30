import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'gatsby-plugin-react-i18next'
import Clickable from './Clickable'

type BadgeProps = {
  text: string
  color?: string
  closable?: boolean
  onClose?: (...args: any[]) => any
  link?: string
  languageBadge?: string
}
const Badge: React.FC<BadgeProps> = ({
  link,
  text,
  color: colorToUse,
  languageBadge,
  closable,
  onClose,
}) => {
  const Wrapper = link ? Link : React.Fragment
  const WrapperProps: any = link ? { to: link } : {}
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

export default Badge

import React from 'react'
import useLanguage from '../../hooks/useLanguage'

export interface CardProps {
  title: string
}

const Card: React.FC<CardProps> = ({ children, title, ...props }) => {
  const { isRtl } = useLanguage()
  return (
    <div
      {...props}
      className={`bg-white flex flex-col rounded-lg mt-20 shadow-lg ${
        isRtl ? 'rtl' : 'ltr'
      }`}
    >
      <div className="title w-4/5 self-center -mt-6 py-4 rounded-lg text-2xl bg-brmg-primary text-white text-center">
        {title}
      </div>
      {children}
    </div>
  )
}

export default Card

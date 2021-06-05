import React from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import {
  FaTwitterSquare,
  FaFacebook,
  FaWhatsappSquare,
  FaLinkedin,
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { sendEvent } from '../../services/analytics'
import useLanguage from '../../hooks/useLanguage'
import { Course, User } from '../../types/api.types'
import Card from '../General/Card'

type Props = {
  course: Course
  url: string
  title: string
}

const ShareButtons: React.FC<Props> = ({ title, url, course }) => {
  const { language } = useLanguage()
  const { t } = useTranslation()

  const handleClick = (name: string) =>
    sendEvent('Course Shares', {
      course: course.title,
      language,
      name,
    })

  return (
    <Card title={t('shareCourse')}>
      <div className="flex justify-around py-6 mt-3">
        <FacebookShareButton
          title={title}
          url={url}
          onClick={() => handleClick('facebook')}
        >
          <FaFacebook size={40} />
        </FacebookShareButton>

        <TwitterShareButton
          url={url}
          title={title}
          onClick={() => handleClick('twitter')}
        >
          <FaTwitterSquare size={40} />
        </TwitterShareButton>

        <LinkedinShareButton
          title={title}
          url={url}
          onClick={() => handleClick('linkedin')}
        >
          <FaLinkedin size={40} />
        </LinkedinShareButton>

        <WhatsappShareButton
          url={url}
          title={title}
          onClick={() => handleClick('whatsapp')}
        >
          <FaWhatsappSquare size={40} />
        </WhatsappShareButton>
      </div>
    </Card>
  )
}

export default ShareButtons

import React from 'react'
import PropTypes from 'prop-types'
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
import { sendEvent } from '../services/analytics'
import useLanguage from '../hooks/useLanguage'

const ShareButtons = ({ title, url, course }) => {
  const { language } = useLanguage()

  const handleClick = name =>
    sendEvent('Course Shares', {
      course: course.title,
      language,
      name,
    })

  return (
    <div className="flex justify-around mt-3">
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
  )
}

ShareButtons.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default ShareButtons

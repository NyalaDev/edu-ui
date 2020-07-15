import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import HtmlViewer from './HtmlViewer'

const CourseCard = ({ title, description, link, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          <Link to={link}>{title}</Link>
        </div>

        <HtmlViewer className="text-gray-700 text-base" data={description} />
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          #winter
        </span>
      </div>
    </div>
  )
}

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default CourseCard

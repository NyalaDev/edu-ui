import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { DiGithubBadge } from 'react-icons/di'

import HtmlViewer from './HtmlViewer'

const CourseViewCard = ({ description, image, githubRepo }) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={image} alt="course" />
        <div className="px-6 py-4">
          <HtmlViewer className="text-gray-700 text-base" data={description} />
        </div>
        <div className="px-6 py-4">
          <Link
            className="block bg-purple-800 text-white text-center hover:bg-purple-900 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
            to="/"
          >
            Start Learning
          </Link>
        </div>
      </div>
      {githubRepo && (
        <div className="max-w-sm rounded overflow-hidden">
          <div className="px-6 py-4">
            <a
              className="flex flex-row-reverse items-center justify-center bg-gray-800 text-white text-center hover:bg-gray-900 font-bold uppercase text-xs px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
              style={{ transition: 'all .15s ease' }}
              href={githubRepo}
              target="_blank"
              rel="noreferrer"
            >
              <DiGithubBadge size={28} />
              <span>View Code</span>
            </a>
          </div>
        </div>
      )}
    </>
  )
}

CourseViewCard.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  githubRepo: PropTypes.string,
}

CourseViewCard.defaultProps = {
  githubRepo: '',
}

export default CourseViewCard

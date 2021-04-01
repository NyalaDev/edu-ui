import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation, Link } from 'gatsby-plugin-react-i18next'
import { FaUserAlt } from 'react-icons/fa'

const InstructorBio = ({ instructor, photo }) => {
  const { t } = useTranslation()

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-5">
      <div className="px-6 py-3 bg-purple-800">
        <h1 className="text-white title text-lg items-center justify-center flex">
          <FaUserAlt />
          <span className="mx-1">{t('instructorBio')}</span>
        </h1>
      </div>
      <div className="py-4 px-6">
        <div className=" mt-4 text-gray-700 text-center">
          <img
            className="h-16 w-16 rounded-full mx-auto"
            alt="instructor"
            src={photo}
          />
          <Link to={`/instructors/${instructor.profile.github}`}>
            <h3 className="px-2 py-3 text-lg font-bold underline text-purple-800">
              {instructor.profile.name}
            </h3>
          </Link>

          <div className="px-2 text-sm font-bold">{instructor.profile.bio}</div>
        </div>
      </div>
    </div>
  )
}

InstructorBio.propTypes = {
  instructor: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      github: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  photo: PropTypes.string.isRequired,
}

export default InstructorBio
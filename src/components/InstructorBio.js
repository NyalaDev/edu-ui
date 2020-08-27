import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const InstructorBio = ({ instructor, photo }) => {
  const { t } = useTranslation()
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
      <div className="px-6 py-3 bg-purple-800">
        <h1 className="text-white font-semibold text-lg text-center items-center">
          {t('instructorBio')}
        </h1>
      </div>
      <div className="py-4 px-6">
        <div className=" mt-4 text-gray-700 text-center">
          <img
            className="h-16 w-16 rounded-full mx-auto"
            alt="instructor"
            src={photo}
          />
          <h3 className="px-2 py-3 text-lg font-bold">
            {instructor.profile.name}
          </h3>
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
    }).isRequired,
  }).isRequired,
  photo: PropTypes.string.isRequired,
}

export default InstructorBio

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { uniqueId } from 'lodash'
import { BiTask } from 'react-icons/bi'
import { Link } from 'gatsby'
import { AuthContext } from '../../contexts/AuthContext'
import CourseExercise from './CourseExercise'

const CourseExercises = ({ course }) => {
  const { resources } = course
  if (!resources) return null

  const { t } = useTranslation()
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-5 relative">
      <div className="px-6 py-3 bg-purple-800">
        <h1 className="text-white font-semibold text-lg items-center justify-center flex">
          <BiTask />
          <span className="mx-1">{t('exercises')}</span>
        </h1>
      </div>

      <div className="relative">
        <div className="py-4 px-6 ">
          {resources.map(resource => {
            if (resource.type !== 'exercise') return null
            return (
              <CourseExercise
                key={uniqueId('exercise-')}
                exercise={resource}
                course={course}
              />
            )
          })}
        </div>

        {!isLoggedIn && (
          <div className="py-4 px-6  absolute top-0 left-0  w-full h-full ">
            <div className="bg-white absolute w-full h-full opacity-80" />
            <div className="flex justify-center items-center w-full h-full">
              <div className="absolute h-40 w-full bg-gray-100 px-3 font-bold pt-20 text-center rounded-md">
                <span>{`${t('viewExcercises')}: `}</span>
                <Link
                  to="/signin"
                  className=" text-purple-800 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  {t('signIn')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

CourseExercises.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        url: PropTypes.string,
        text: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default CourseExercises

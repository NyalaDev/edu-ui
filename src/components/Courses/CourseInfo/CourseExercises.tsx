import React, { useContext } from 'react'
import { useTranslation, Link } from 'gatsby-plugin-react-i18next'
import { uniqueId } from 'lodash'
import { BiTask } from 'react-icons/bi'
import { AuthContext } from '../../../contexts/AuthContext'
import CourseExercise from './CourseExercise'
import { Resource } from '../../../types/api.types'

type Props = {
  exercises: Resource[]
  courseId: number
}

const CourseExercises: React.FC<Props> = ({ courseId, exercises }) => {
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
          {exercises.map(exercise => (
            <CourseExercise
              key={uniqueId('exercise-')}
              exercise={exercise}
              courseId={courseId}
            />
          ))}
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

export default CourseExercises

import React, { useContext } from 'react'
import { useTranslation, Link } from 'gatsby-plugin-react-i18next'
import { uniqueId } from 'lodash'
import { BiTask } from 'react-icons/bi'
import { AuthContext } from '../../../contexts/AuthContext'
import CourseExercise from './CourseExercise'
import { Resource } from '../../../types/api.types'
import Card from '../../General/Card'

type Props = {
  exercises: Resource[]
  courseId: number
}

const CourseExercises: React.FC<Props> = ({ courseId, exercises }) => {
  const { t } = useTranslation()
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Card title={t('exercises')}>
      <div className="w-full rounded overflow-hidden my-5 relative">
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
                    className=" text-brmg-primary focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    {t('signIn')}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default CourseExercises

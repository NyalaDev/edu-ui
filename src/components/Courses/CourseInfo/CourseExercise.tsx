import React, { useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { toast } from 'react-toastify'
import { addPRToReview } from '../../../services/api'
import { Resource } from '../../../types/api.types'

type Props = {
  exercise: Resource
  courseId: number
}

const CourseExercise: React.FC<Props> = ({ exercise, courseId }) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  const handleSubmitBtnClick = async () => {
    try {
      await addPRToReview({
        link: inputValue,
        course: courseId,
        exercise: exercise.text,
      })
      toast.success('PR submitted successfully')
    } catch (err) {
      const message = err.message.match(/(403|400)/)
        ? 'errors.invalid_auth'
        : 'errors.generic'
      toast.error(t(message))
    }
  }

  return (
    <div className=" border rounded-sm px-3 py-3 my-5">
      <div>
        <div className="text-purple-800 font-bold">
          <a
            className="flex flex-row-reverse items-center justify-center text-purple-800 mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
            href={exercise.url}
            target="_blank"
            rel="noreferrer"
          >
            <span>{exercise.text}</span>
          </a>
        </div>
        <input
          type="text"
          className="border p-2 rounded-sm w-full"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmitBtnClick}
          className="w-full bg-gray-800 text-white text-center hover:bg-gray-900 font-bold uppercase text-md px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none my-3"
        >
          {t('submit')}
        </button>
      </div>
    </div>
  )
}

export default CourseExercise

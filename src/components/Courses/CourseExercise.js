import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { toast } from 'react-toastify'
import { uniqueId } from 'lodash'
import { addPRToReview } from '../../services/api'

const CourseExercise = ({ exercise, courseId }) => {
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
    <div
      key={uniqueId('exercise-')}
      className=" border rounded-sm px-3 py-3 my-5 "
    >
      <div className="py-4">
        <a
          className="flex flex-row-reverse items-center justify-center bg-purple-800 text-white text-center hover:bg-gray-900 font-bold uppercase text-md px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
          style={{ transition: 'all .15s ease' }}
          href={exercise.url}
          target="_blank"
          rel="noreferrer"
        >
          <span>{exercise.text}</span>
        </a>
      </div>

      <div>
        <div className="text-purple-800 font-bold">{t('linkToPR')}</div>
        <input
          className="border rounded-sm w-full"
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

CourseExercise.propTypes = {
  exercise: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  courseId: PropTypes.number.isRequired,
}

export default CourseExercise

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { uniqueId } from 'lodash'
import { addRating } from '../../services/api'
import Star from '../General/Star'

const CourseRating = ({ onDismiss, courseId, lectureId }) => {
  const { t } = useTranslation()
  const totalStars = 5
  const [rating, setRating] = useState(0)
  const [textValue, setTextValue] = useState('')

  return (
    <div className="rounded absolute absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gray-100">
      <button type="button" className="m-1" onClick={onDismiss}>
        <div className="h-6 w-6 text-3xl font-bold hover:">×</div>
      </button>

      <div className="flex flex-col items-center h-full">
        <h1 className="text-2xl mb-3 border-b-2"> {t('rateCourse')}</h1>

        <div className="flex mb-2">
          {[...Array(totalStars)].map((n, i) => (
            <Star
              key={uniqueId('rating-')}
              selected={i < rating}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>

        <textarea
          className="p-1 mb-2 border border-gray-400 rounded placeholder-gray-600 focus:outline-none focus:border-purple-800"
          type="text"
          placeholder="Your review"
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
        />

        <button
          type="submit"
          className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
          onClick={async () => {
            await addRating({
              courseId,
              rating,
              text: textValue,
              lectureId,
            })
          }}
        >
          {t('submit')}
        </button>
      </div>
    </div>
  )
}

export default CourseRating

CourseRating.propTypes = {
  onDismiss: PropTypes.func,
  courseId: PropTypes.number.isRequired,
  lectureId: PropTypes.number.isRequired,
}

CourseRating.defaultProps = {
  onDismiss: () => {},
}

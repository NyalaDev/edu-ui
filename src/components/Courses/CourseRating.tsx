import React, { useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { uniqueId } from 'lodash'
import { addRating } from '../../services/api'
import Star from '../General/Star'

type CourseRatingProps = {
  onDismiss?: (...args: any[]) => any
  courseId: number
  lectureId: number
}
const CourseRating: React.FC<CourseRatingProps> = ({
  onDismiss,
  courseId,
  lectureId,
}) => {
  const { t } = useTranslation()
  const totalStars = 5
  const [rating, setRating] = useState(0)
  const [textValue, setTextValue] = useState('')
  const onAddRating = async () => {
    if (rating || textValue) {
      await addRating({
        courseId,
        rating,
        text: textValue,
        lectureId,
      })
    }
    if (onDismiss) {
      onDismiss()
    }
  }
  return (
    <div className="rounded absolute p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-gray-100">
      <button type="button" className="m-1" onClick={onDismiss}>
        <div className="h-6 w-6 text-3xl font-bold hover:">×</div>
      </button>

      <div className="flex flex-col items-center h-full">
        <div className="text-xl mb-3 border-b-2"> {t('rateCourse')}</div>

        <div className="flex mb-2">
          {[...Array(totalStars)].map((_n: number, i: number) => (
            <Star
              key={uniqueId('rating-')}
              selected={i < rating}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>

        <textarea
          className="p-1 w-full mb-2 border border-gray-400 rounded placeholder-gray-600 focus:outline-none focus:border-purple-800"
          placeholder="Your review"
          value={textValue}
          rows={4}
          onChange={e => setTextValue(e.target.value)}
        />

        <button
          type="submit"
          className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
          onClick={onAddRating}
        >
          {t('submit')}
        </button>
      </div>
    </div>
  )
}
export default CourseRating

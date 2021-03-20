import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FaRegClock, FaRegCalendarAlt, FaInfoCircle } from 'react-icons/fa'
import { DateTime } from 'luxon'
import { calculateVideosDuration } from '../../common/util'

const CourseMeta = ({ lectures, createdAt }) => {
  const { t } = useTranslation()
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-5 ">
      <div className="px-6 py-3 bg-purple-800">
        <h1 className="text-white title text-lg items-center justify-center flex">
          <FaInfoCircle />
          <span className="mx-1">{t('aboutCourse')}</span>
        </h1>
      </div>

      <div className="py-4 px-6">
        <div className="flex items-center mt-4 text-gray-700">
          <div className="font-bold pl-1 pr-4">{t('duration')}</div>
          <div className="px-2 text-sm">
            {calculateVideosDuration(lectures)}
          </div>
          <FaRegClock />
        </div>

        <div className="flex items-center mt-4 text-gray-700">
          <div className="font-bold pl-1 pr-4">{t('released')}</div>
          <div className="px-2 text-sm ">
            {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}
          </div>
          <FaRegCalendarAlt />
        </div>
      </div>
    </div>
  )
}

CourseMeta.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.string.isRequired,
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default CourseMeta

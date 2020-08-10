import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaRegClock, FaRegCalendarAlt } from 'react-icons/fa'
import moment from 'moment'

import { calculateVideosDuration } from '../common/util'

const CourseMeta = ({ lectures, createdAt }) => {
  const { t } = useTranslation()
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
      <div className="px-6 py-3 bg-purple-800">
        <h1 className="text-white font-semibold text-lg text-center items-center">
          {t('aboutCourse')}
        </h1>
      </div>

      <div className="py-4 px-6">
        <div className="flex justify-end items-center mt-4 text-gray-700">
          <div className="px-2 text-sm font-bold">
            {calculateVideosDuration(lectures)}
          </div>
          <div className="font-bold pl-1 pr-4">{t('duration')}</div>
          <FaRegClock />
        </div>

        <div className="flex justify-end items-center mt-4 text-gray-700">
          <div className="px-2 text-sm font-bold">
            {moment.utc(createdAt).format('DD/MM/YYYY')}
          </div>
          <div className="font-bold pl-1 pr-4">{t('released')}</div>
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

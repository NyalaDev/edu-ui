import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Badge from './Badge'

const CourseTags = ({ tags }) => {
  const { t } = useTranslation()
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-5">
      <div className="px-6 py-3 bg-purple-800">
        <h1 className="text-white font-semibold text-lg text-center items-center">
          {t('courseTags')}
        </h1>
      </div>

      <div className="py-4 px-6">
        <div className="flex flex-wrap">
          {tags.map(tag => (
            <Badge
              key={tag.id}
              text={tag.tagName}
              color="purple-800"
              link={`/tags/${tag.tagName}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

CourseTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tagName: PropTypes.string,
    })
  ).isRequired,
}

export default CourseTags

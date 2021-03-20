import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FaTag } from 'react-icons/fa'
import Badge from '../Badge'

const CourseTags = ({ tags }) => {
  const { t } = useTranslation()
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-5">
      <div className="px-6 py-3 bg-purple-800">
        <h1 className="text-white title text-lg items-center justify-center flex">
          <FaTag />
          <span className="mx-1">{t('courseTags')}</span>
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

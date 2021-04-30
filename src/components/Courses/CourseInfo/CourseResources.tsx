import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { uniqueId } from 'lodash'
import { FaPaperclip } from 'react-icons/fa'
import { Course } from '../../../types/api.types'

type Props = {
  course: Course
}

const CourseResources: React.FC<Props> = ({ course }) => {
  const { t } = useTranslation()
  const { resources = [] } = course

  const linkResources = resources
    ? resources.filter(r => r.type === 'link')
    : []

  if (!linkResources || !linkResources.length) return null

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-5 ">
      <div className="px-6 py-3 bg-purple-800">
        <h1 className="text-white title text-lg items-center justify-center flex">
          <FaPaperclip />
          <span className="mx-1">{t('resources')}</span>
        </h1>
      </div>

      <div className="py-4 px-6">
        <ul>
          {resources.map(resource => {
            if (resource.type !== 'link') return null

            return (
              <li
                key={uniqueId('resource-')}
                className="border list-none rounded-sm px-3 py-3"
              >
                <a
                  className="text-purple-800 py-1 "
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{resource.text}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CourseResources

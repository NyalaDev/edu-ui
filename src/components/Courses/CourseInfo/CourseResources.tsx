import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { uniqueId } from 'lodash'
import { Course } from '../../../types/api.types'
import Card from '../../General/Card'

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
    <Card title={t('resources')}>
      <ul className="py-4">
        {resources.map(resource => {
          if (resource.type !== 'link') return null

          return (
            <li key={uniqueId('resource-')} className="list-none px-3 py-3">
              <a
                className="text-brmg-black text-lg py-1 "
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
    </Card>
  )
}

export default CourseResources

import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FaRegClock, FaRegCalendarAlt, FaInfoCircle } from 'react-icons/fa'
import { DateTime } from 'luxon'
import { calculateVideosDuration } from '../../../common/util'
import Badge from '../../General/Badge'
import useLanguage from '../../../hooks/useLanguage'
import { Lecture, Tag } from '../../../types/api.types'
import Card from '../../General/Card'

type Props = {
  lectures: Lecture[]
  tags: Tag[]
}

const CourseMeta: React.FC<Props> = ({ lectures, tags }) => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const courseCreatedDate = DateTime.fromISO(lectures[0].created_at)
  const courseDate =
    language === 'ar'
      ? courseCreatedDate.setLocale('ar').toLocaleString(DateTime.DATE_FULL)
      : courseCreatedDate.toLocaleString(DateTime.DATE_FULL)
  return (
    <Card title={t('aboutCourse')} data-testid="about-course">
      <div className="py-4 px-6 text-brmg-subtle">
        <div className="flex items-center mt-4">
          <div className="font-bold pl-1 pr-4">{t('duration')}</div>
          <div className="px-2 text-sm">
            {calculateVideosDuration(lectures)}
          </div>
          <FaRegClock />
        </div>

        <div className="flex items-center mt-4">
          <div className="font-bold pl-1 pr-4">{t('released')}</div>
          <div className="px-2 text-sm ">{courseDate}</div>
          <FaRegCalendarAlt />
        </div>
        <div className="mt-4">
          <div className="font-bold pl-1 pr-4">{t('courseTags')}</div>
          <div className="flex items-center font-bold mt-2 px-2">
            {tags.map(tag => (
              <Badge
                key={tag.id}
                text={tag.tagName}
                color="brmg-secondary"
                link={`/tags/${tag.tagName}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CourseMeta

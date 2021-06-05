import React from 'react'
import { useTranslation, Link } from 'gatsby-plugin-react-i18next'
import { User } from '../../../types/api.types'
import Card from '../../General/Card'

type Props = {
  instructor: User
  photo: string
}

const InstructorBio: React.FC<Props> = ({ instructor, photo }) => {
  const { t } = useTranslation()

  return (
    <Card title={t('instructorBio')}>
      <div className="py-4 px-6">
        <div className=" mt-4 text-gray-700 text-center">
          <img
            className="h-16 w-16 rounded-full mx-auto"
            alt="instructor"
            src={photo}
          />
          <Link to={`/instructors/${instructor.profile.github}`}>
            <h3 className="px-2 py-3 text-lg font-bold underline text-purple-800">
              {instructor.profile.name}
            </h3>
          </Link>

          <div className="px-2 text-sm font-bold">{instructor.profile.bio}</div>
        </div>
      </div>
    </Card>
  )
}

export default InstructorBio

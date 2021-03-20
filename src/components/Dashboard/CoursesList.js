import React, { useEffect, useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { navigate } from 'gatsby'
import Layout from '../Layout'
import Seo from '../Seo'
import CourseCard from '../Courses/CourseCard'
import { teacher } from '../../services/api'
import { getYoutubeThumbnail } from '../../common/util'
import Breadcrumbs from './Breadcrumb'

const CoursesList = () => {
  const { t } = useTranslation()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await teacher.listCourses()
        setCourses(data)
      } catch (e) {
        setCourses([])
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Seo title="Teacher Dashboard" />
      <Layout pageTitle={t('dashboard')}>
        <Breadcrumbs />
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard/new-course')}
            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-600 focus:outline-none"
            type="button"
          >
            {t('addCourse')}
          </button>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
          {courses.map(course => {
            const { lectures = {} } = course
            const { url = '' } = lectures[0] || {}
            return (
              <CourseCard
                key={course.id}
                course={course}
                image={getYoutubeThumbnail(url)}
                forDashboard
              />
            )
          })}
        </div>
      </Layout>
    </>
  )
}

CoursesList.propTypes = {}

export default CoursesList

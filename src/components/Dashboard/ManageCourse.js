import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Layout from '../Layout'
import Seo from '../Seo'
import ActivityIndicator from '../ActivityIndicator'
import Clickable from '../Clickable'
import CourseForm from './CourseForm'
import LecturesList from './LecturesList'
import ResourcesList from './ResourcesList'

import { teacher } from '../../services/api'
import { AdminContext } from '../../contexts/AdminContext'
import Breadcrumbs from './Breadcrumb'
import Badge from '../Badge'
import AutoCompleteInput from '../AutocompleteInput'

const tabs = [
  { id: 1, title: 'courseDetails' },
  { id: 2, title: 'lectures' },
  { id: 3, title: 'resources' },
]

const StyledButton = styled.button.attrs(props => ({
  className: `py-2 px-4 bg-${
    props.disabled ? 'gray' : props.color
  }-600 text-white rounded hover:bg-${
    props.color
  }-400 focus:outline-none w-full ${props.disabled && 'cursor-not-allowed'}`,
}))``

const ManageCourse = ({ slug }) => {
  const { t } = useTranslation()
  const { fetching: fetchingAdminContext, languages, tags } = useContext(
    AdminContext
  )
  const [refreshIndex, setRefreshIndex] = useState(1)
  const [currentTab, setCurrentTab] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [course, setCourse] = useState({})

  const { status, tags: coruseTags = [] } = course

  const actionBtnLabel = status === 'Published' ? 'unpublish' : 'publish'
  const actionBtnColor = status === 'Published' ? 'red' : 'green'
  const hasLectures = course && course.lectures && course.lectures.length > 0

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setFetching(true)
        await teacher.getCourseDetails(slug)
        const { data } = await teacher.getCourseDetails(slug)
        setCourse(data)
        setFetching(false)
      } catch (e) {
        setFetching(false)
      }
    }
    fetchCourse()
  }, [refreshIndex])

  const toggleCourseStatus = async () => {
    try {
      setUpdatingStatus(true)
      const courseStatus = status === 'Draft' ? 'Published' : 'Draft'
      await teacher.patchCourse({ status: courseStatus }, course.id)
      setRefreshIndex(refreshIndex + 1)
      setUpdatingStatus(false)
    } catch (e) {
      setUpdatingStatus(false)
    }
  }

  const onRemoveTag = async tag => {
    const updatedTags = coruseTags.filter(aTag => aTag.id !== tag.id)
    try {
      await teacher.patchCourse({ tags: updatedTags }, course.id)
      setRefreshIndex(refreshIndex + 1)
    } catch (e) {
      //
    }
  }

  const onAddTag = async tag => {
    try {
      const updatedTags = coruseTags.map(aTag => aTag.id)
      if (!updatedTags.includes(tag.id)) {
        updatedTags.push(tag.id)
        await teacher.patchCourse({ tags: updatedTags }, course.id)
      }
      setRefreshIndex(refreshIndex + 1)
    } catch (e) {
      //
    }
  }

  return (
    <Layout pageTitle="Manage Course">
      <Seo title="Manage Course " />
      <ActivityIndicator
        active={fetching || fetchingAdminContext || !course.id}
      >
        <Breadcrumbs name="Manage Course" />
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/4">
            {status && (
              <Badge
                text={status}
                color={`${status === 'Published' ? 'green' : 'red'}-600`}
              />
            )}
            <ul className="flex flex-col">
              {tabs.map((tab, index) => (
                <Clickable
                  key={tab.id}
                  onClick={() => setCurrentTab(index + 1)}
                >
                  <li
                    className={`rounded-t -mb-px block border p-4 border-grey hover:bg-gray-800 hover:text-white cursor-pointer ${
                      tab.id === currentTab && 'bg-gray-800 text-white'
                    }`}
                  >
                    {t(tab.title)}
                  </li>
                </Clickable>
              ))}
            </ul>

            <div className="w-full flex mt-5">
              <ActivityIndicator active={updatingStatus}>
                <StyledButton
                  type="button"
                  disabled={!hasLectures}
                  color={actionBtnColor}
                  onClick={toggleCourseStatus}
                >
                  {t(actionBtnLabel)}
                </StyledButton>
              </ActivityIndicator>
            </div>

            <div className="w-full flex flex-col mt-5 bg-white rounded-lg shadow-md overflow-hidden p-2">
              <div className="flex flex-wrap">
                {coruseTags.map(tag => (
                  <Badge
                    key={tag.id}
                    color="purple-500"
                    text={tag.tagName}
                    closable
                    onClose={() => onRemoveTag(tag)}
                  />
                ))}
              </div>
              <AutoCompleteInput
                name="tag"
                placeholder="Tag course"
                options={tags.map(tag => ({ id: tag.id, name: tag.tagName }))}
                onSelect={tag => onAddTag(tag)}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            {currentTab === 1 && (
              <CourseForm
                languages={languages}
                course={course}
                onSaveSuccess={() => setRefreshIndex(refreshIndex + 1)}
              />
            )}
            {currentTab === 2 && (
              <LecturesList
                languages={languages}
                course={course}
                onSaveSuccess={() => setRefreshIndex(refreshIndex + 1)}
              />
            )}
            {currentTab === 3 && (
              <ResourcesList
                course={course}
                onSaveSuccess={() => setRefreshIndex(refreshIndex + 1)}
              />
            )}
          </div>
        </div>
      </ActivityIndicator>
    </Layout>
  )
}

ManageCourse.propTypes = {
  slug: PropTypes.string.isRequired,
}

export default ManageCourse

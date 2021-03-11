import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { flatten, uniq, find } from 'lodash'
import { appLanguages } from '../LanguageSwitcher'
import { AppContext } from '../../contexts/AppContext'

const Filters = () => {
  const { t } = useTranslation()

  const { initialCoursesList, setCourses } = useContext(AppContext)
  const [values, setValues] = useState({})

  const tags = uniq(
    flatten(
      initialCoursesList.map(course => course.tags.map(tag => tag.tagName))
    )
  )
  const levels = ['Beginner', 'Intermediate', 'Advanced']

  useEffect(() => {
    let filteredList = [...initialCoursesList]

    Object.keys(values).forEach(key => {
      const value = values[key]
      if (value === '-1') return
      if (key === 'language') {
        filteredList = filteredList.filter(
          course => course.language.iso2 === value
        )
      }
      if (key === 'tag') {
        filteredList = filteredList.filter(course =>
          find(course.tags, ({ tagName }) => tagName === value)
        )
      }
      if (key === 'level') {
        filteredList = filteredList.filter(course => course.level === value)
      }
    })

    setCourses(filteredList)
  }, [values])

  const updateList = event => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  return (
    <div className="mb-6">
      <div className="flex w-3/4 items-center">
        <h1>{t('filters.title')}</h1>
        <select
          className="mx-4 placeholder-gray-500 focus:outline-none focus:bg-white"
          name="language"
          value={values.language}
          onChange={updateList}
        >
          <option value="-1">{t('filters.allLanguages')}</option>
          {appLanguages.map(({ locale, label }) => {
            return (
              <option key={locale} value={locale}>
                {label}
              </option>
            )
          })}
        </select>
        <select
          className="mx-4 placeholder-gray-500 focus:outline-none focus:bg-white"
          name="tag"
          value={values.tag}
          onChange={updateList}
        >
          <option value="-1">{t('filters.allTags')}</option>
          {tags.map(tag => {
            return (
              <option key={tag} value={tag}>
                {tag}
              </option>
            )
          })}
        </select>
        <select
          className="mx-4 placeholder-gray-500 focus:outline-none focus:bg-white"
          name="level"
          value={values.level}
          onChange={updateList}
        >
          <option value="-1">{t('filters.allLevels')}</option>
          {levels.map(level => {
            return (
              <option key={level} value={level}>
                {level}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default Filters

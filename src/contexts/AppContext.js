import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { CoursePropType } from '../common/util'

export const AppContext = createContext({
  courses: [],
  setCourses: () => {},
  setAllCourses: () => {},
})

/**
 * App Context Provider
 */
export const AppProvider = ({ children, initialCoursesList }) => {
  const [courses, setCourses] = useState([])

  return (
    <AppContext.Provider
      value={{
        courses,
        setCourses,
        initialCoursesList,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  initialCoursesList: PropTypes.arrayOf(CoursePropType).isRequired,
}

import React, { createContext, useState } from 'react'
import { Course } from '../types/api.types'

type AppContextType = {
  courses: Course[]
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>
  initialCoursesList: Course[]
}

type AppProviderType = {
  initialCoursesList: Course[]
}

export const AppContext = createContext<AppContextType>({
  courses: [],
  setCourses: () => {},
  initialCoursesList: [],
})

/**
 * App Context Provider
 */
export const AppProvider: React.FC<AppProviderType> = ({
  children,
  initialCoursesList,
}) => {
  const [courses, setCourses] = useState<Course[]>([])

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

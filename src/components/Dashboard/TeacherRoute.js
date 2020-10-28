import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const TeacherRoute = ({ component: Component, ...rest }) => {
  const { isTeacher } = useContext(AuthContext)
  if (!isTeacher) {
    return null
  }
  return <Component {...rest} />
}
export default TeacherRoute

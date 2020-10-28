import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { AuthContext } from '../../contexts/AuthContext'

const TeacherRoute = ({ component: Component, ...rest }) => {
  const { isTeacher } = useContext(AuthContext)
  if (!isTeacher) {
    navigate('/')
    return null
  }
  return <Component {...rest} />
}
export default TeacherRoute

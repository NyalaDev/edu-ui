import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router'
import {
  TeacherRoute,
  CoursesList,
  ManageCourse,
  NewCourse,
} from '../components/Dashboard'
import { AdminProvider } from '../contexts/AdminContext'

const Dashboard = () => (
  <AdminProvider>
    <Router basepath="/dashboard">
      <TeacherRoute path="/manage/:slug" component={ManageCourse} />
      <TeacherRoute path="/new-course" component={NewCourse} />
      <TeacherRoute path="/" component={CoursesList} />
    </Router>
  </AdminProvider>
)

export default Dashboard

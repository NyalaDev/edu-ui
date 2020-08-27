import React from 'react'
import { Link, navigate } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { isBrowser } from '../services/localStorage'

const IndexPage = () => {
  // Do not show the landing page for now
  if (isBrowser) {
    navigate('/courses')
  }

  return (
    <Layout>
      <Seo title="Home" />
      <h4>This page is still a WIP</h4>
      <Link to="/courses">Browser Courses</Link>
    </Layout>
  )
}

export default IndexPage

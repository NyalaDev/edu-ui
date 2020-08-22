import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <h4>This page is still a WIP</h4>
      <Link to="/courses">Browser Courses</Link>
    </Layout>
  )
}

export default IndexPage

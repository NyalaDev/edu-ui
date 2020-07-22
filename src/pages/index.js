import React from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { Link } from 'gatsby'

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h4>This page is still a WIP</h4>
    <Link to="/courses">Browser Courses</Link>
  </Layout>
)

export default IndexPage

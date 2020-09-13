import React from 'react'
import { navigate } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { isBrowser } from '../services/localStorage'
import Spinner from '../components/Spinner'

const IndexPage = () => {
  // Do not show the landing page for now
  if (isBrowser) {
    navigate('/courses')
  }

  return (
    <Layout>
      <Seo title="Home" />
      <Spinner />
    </Layout>
  )
}

export default IndexPage

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import formikProps from '../../common/formik-props'
import SignupForm from './SignupForm'

const Signup = () => (
  <Layout>
    <SignupForm />
  </Layout>
)

Signup.propTypes = {
  ...formikProps,
}
export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
  }
`
export default Signup

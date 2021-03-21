/* eslint-disable */
const React = require('react')
const { AuthProvider } = require('./src/contexts/AuthContext')
const Seo = require('./src/components/Seo')

exports.wrapRootElement = ({ element }) => {
  return <AuthProvider>{element}</AuthProvider>
}

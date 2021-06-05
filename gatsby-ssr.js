/* eslint-disable */
const React = require('react')
const { AuthProvider } = require('./src/contexts/AuthContext')
const Seo = require('./src/components/General/Seo')

exports.wrapRootElement = ({ element }) => {
  return <AuthProvider>{element}</AuthProvider>
}

/* eslint-disable */
const React = require('react')
const { AuthProvider } = require('./src/contexts/AuthContext')

exports.wrapRootElement = ({ element }) => {
  return <AuthProvider>{element}</AuthProvider>
}

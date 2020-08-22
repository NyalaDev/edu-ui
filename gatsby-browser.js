/* eslint-disable */
import React from 'react'
import { AuthProvider } from './src/contexts/AuthContext'

export const wrapRootElement = ({ element }) => {
  return <AuthProvider>{element}</AuthProvider>
}

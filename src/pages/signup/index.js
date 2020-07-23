import React from 'react'
import Layout from '../../components/Layout'
import formEnhancer from './enhancedForm'

const signup = ({
  getFieldProps,
  handleSubmit,
  touched,
  errors,
  isSubmitting,
}) => {
  return (
    <Layout>
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md overflow-hidden mx-auto">
        <div className="py-4 px-6">
          <h2 className="text-center font-bold text-gray-700 text-3xl">
            Sign up
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mt-4 w-full">
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="text"
                placeholder="Name"
                aria-label="Name"
                name="username"
                {...getFieldProps('username')}
              />
              {touched.username && errors.username && (
                <span>{errors.username}</span>
              )}
            </div>
            <div className="mt-4 w-full">
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="email"
                placeholder="Email"
                aria-label="email"
                name="email"
                {...getFieldProps('email')}
              />
              {touched.email && errors.email && <span>{errors.email}</span>}
            </div>

            <div className="mt-4 w-full">
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="password"
                placeholder="Password"
                aria-label="password"
                name="password"
                {...getFieldProps('password')}
              />
              {touched.password && errors.password && (
                <span>{errors.password}</span>
              )}
            </div>

            <div className="mt-4 w-full">
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="password"
                placeholder="Password Confirmation"
                aria-label="passwordConfirmation"
                name="passwordConfirmation"
                {...getFieldProps('passwordConfirmation')}
              />
              {touched.passwordConfirmation && errors.passwordConfirmation && (
                <span>{errors.passwordConfirmation}</span>
              )}
            </div>

            <div className="flex justify-between items-center mt-6">
              {!isSubmitting && (
                <button
                  className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                  type="submit"
                >
                  Sign Up
                </button>
              )}
              {isSubmitting && <span>One sec ...</span>}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default formEnhancer(signup)

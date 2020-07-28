import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as api from '../../services/api'
import * as Yup from 'yup'
import {
  getLocalStorage,
  clearLocalStorage,
  TOKEN_KEY,
  USER_DATA_KEY,
  isBrowser,
} from '../../services/localStorage'
const url = process.env.GATSBY_STRAPI_API_URL || 'http://localhost:8082'

const SigninForm = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const token = getLocalStorage(TOKEN_KEY)
  useEffect(() => {
    if (token) {
      setSuccess(true)
    }
  }, [token])
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validationSchema: Yup.object({
      identifier: Yup.string().required('Please provide username or email'),
      password: Yup.string().required('Please provide password'),
    }),
    onSubmit: async values => {
      try {
        const result = await api.signin(values)
        setError(null)
        if (isBrowser) window.location.reload()
      } catch (err) {
        if (err.message.match(/(403|400)/)) {
          setError('Wrong user name or password')
        } else setError('Something went wrong')
      }
    },
  })
  const clearToken = () => {
    clearLocalStorage(TOKEN_KEY)
    clearLocalStorage(USER_DATA_KEY)
    if (isBrowser) window.location.reload()
  }
  return (
    <div className="container mx-auto h-full flex justify-center items-center">
      <div className="w-1/2">
        <h2 className="text-center font-bold text-gray-700 text-3xl">
          {!success ? 'Sign in to Coder Hup' : ''}
        </h2>
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg mt-3">
          {!success && (
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="font-bold text-grey-darker block mb-2">
                  Username or Email
                </label>
                <input
                  {...formik.getFieldProps('identifier')}
                  type="text"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder="Your Username or Password"
                />
                {formik.touched.identifier && formik.errors.identifier ? (
                  <div className="text-red-600 mt-1">
                    {formik.errors.identifier}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="font-bold text-grey-darker block mb-2">
                  Password
                </label>
                <input
                  {...formik.getFieldProps('password')}
                  type="password"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder="Your Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600 mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                  type="submit"
                >
                  Sign in
                </button>

                <a
                  className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <h1 className="font-bold text-grey-darker block mb-2 mt-5">
                  Or
                </h1>
                <button className="py-2 px-4 bg-gray-700 text-white text-center rounded hover:bg-gray-600 focus:outline-none mt-5 ml-4">
                  <a href={`${url}/connect/github`}>Sign in using Github</a>
                </button>
              </div>
            </form>
          )}
          {error && <div className="text-red-600 mt-1">{error}</div>}
          {success && (
            <div className="mt-1 text-center">
              <div className="font-bold text-green-600 text-lg text-grey-darker block mb-2">
                Signed in Successfuly !
              </div>
              <button className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none mt-5">
                <a href="/courses">Courses</a>
              </button>
              <button
                className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none mt-5 ml-4"
                type="submit"
                onClick={clearToken}
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-grey-dark text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="no-underline text-blue font-bold">
              Create an Account
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default SigninForm

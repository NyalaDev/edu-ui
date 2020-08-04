import React from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import SocialButton from '../../components/SocialButton'
import formEnhancer from './enhancedForm'
import formikProps from '../../common/formik-props'

const providers = ['GitHub', 'Google']

const Signup = ({
  getFieldProps,
  handleSubmit,
  touched,
  errors,
  isSubmitting,
}) => {
  const { t } = useTranslation()

  return (
    <Layout>
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md overflow-hidden mx-auto">
        <div className="py-4 px-6">
          <h2 className="text-center font-bold text-gray-700 text-3xl">
            {t('signUp')}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mt-4 w-full">
              <label
                htmlFor="name"
                className="font-bold text-grey-darker block mb-2"
              >
                {t('name')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="text"
                placeholder={t('name')}
                aria-label="Name"
                name="username"
                {...getFieldProps('username')}
              />
              {touched.username && errors.username && (
                <span>{errors.username}</span>
              )}
            </div>
            <div className="mt-4 w-full">
              <label
                htmlFor="email"
                className="font-bold text-grey-darker block mb-2"
              >
                {t('email')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="email"
                placeholder={t('email')}
                aria-label="email"
                name="email"
                {...getFieldProps('email')}
              />
              {touched.email && errors.email && <span>{errors.email}</span>}
            </div>

            <div className="mt-4 w-full">
              <label
                htmlFor="password"
                className="font-bold text-grey-darker block mb-2"
              >
                {t('email')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="password"
                placeholder={t('password')}
                aria-label="password"
                name="password"
                {...getFieldProps('password')}
              />
              {touched.password && errors.password && (
                <span>{errors.password}</span>
              )}
            </div>

            <div className="mt-4 w-full">
              <label
                htmlFor="passwordConfirmation"
                className="font-bold text-grey-darker block mb-2"
              >
                {t('passConfirm')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="password"
                placeholder={t('passConfirm')}
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
                  {t('signUp')}
                </button>
              )}
              {isSubmitting && <span>One sec ...</span>}
            </div>

            <div className="text-center">
              <h1 className="font-bold text-grey-darker block mb-2 mt-5">
                {t('or')}
              </h1>
            </div>
          </form>

          <div>
            {providers.map(provider => (
              <SocialButton key={provider} provider={provider} />
            ))}
          </div>

          <div className="text-center mt-6 mb-2">
            <p className="text-grey-dark text-sm">
              {`${t('hasAccount')} `}
              <Link to="/signin" className="no-underline text-blue font-bold">
                {t('signIn')}
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

Signup.propTypes = {
  ...formikProps,
}

export default formEnhancer(Signup)

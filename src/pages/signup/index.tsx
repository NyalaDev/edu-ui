import React, { useState, useContext } from 'react'
import { useFormik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useTranslation, Link } from 'gatsby-plugin-react-i18next'
import { toast } from 'react-toastify'
import { graphql, navigate } from 'gatsby'
import { AuthContext } from '../../contexts/AuthContext'
import Layout from '../../components/Layout'
import SocialButton, { SocialProvider } from '../../components/SocialButton'
import useLanguage from '../../hooks/useLanguage'
import { signUp } from '../../services/api'

const providers: SocialProvider[] = ['GitHub']

interface FormValues {
  name: string
  email: string
  password: string
  language: string
  passwordConfirmation: string
  emailSubscription: boolean
}

const Signup: React.FC<FormikProps<FormValues>> = () => {
  const { t } = useTranslation()

  const { setCurrentUser, setAuthToken } = useContext(AuthContext)
  const { language } = useLanguage()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      emailSubscription: false,
      language,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords should match!')
        .required(),
    }),
    onSubmit: async (values, bag) => {
      try {
        bag.setSubmitting(true)
        const data = await signUp({ ...values, username: values.email })
        toast.success('You created your account sucessfully!')
        setAuthToken(data.jwt)
        setCurrentUser({
          ...data.user,
          profile: {
            name: values.name,
          },
        })
        bag.setSubmitting(false)
        bag.resetForm()
        setTimeout(() => {
          navigate('/profile')
        }, 3000)
      } catch (e) {
        bag.setSubmitting(false)
        // FIXME: Add proper massage handler
        toast.error('Something went wrong. Please try again')
      }
    },
  })

  return (
    <Layout title={t('signUp')}>
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md overflow-hidden mx-auto">
        <div className="py-4 px-6">
          <h2 className="text-center text-gray-700 text-3xl">{t('signUp')}</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4 w-full">
              <label htmlFor="name" className="text-grey-darker block mb-2">
                {t('name')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                id="name"
                type="text"
                placeholder={t('name')}
                aria-label="Name"
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <span className="text-red-500">{formik.errors.name}</span>
              )}
            </div>
            <div className="mt-4 w-full">
              <label htmlFor="email" className="text-grey-darker block mb-2">
                {t('email')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                id="email"
                type="email"
                placeholder={t('email')}
                aria-label="email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500">{formik.errors.email}</span>
              )}
            </div>

            <div className="mt-4 w-full">
              <label htmlFor="password" className="text-grey-darker block mb-2">
                {t('password')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                id="password"
                type="password"
                placeholder={t('password')}
                aria-label="password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500">{formik.errors.password}</span>
              )}
            </div>

            <div className="mt-4 w-full">
              <label
                htmlFor="passwordConfirmation"
                className="text-grey-darker block mb-2"
              >
                {t('passConfirm')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                id="passConfirm"
                type="password"
                placeholder={t('passConfirm')}
                aria-label="passwordConfirmation"
                {...formik.getFieldProps('passwordConfirmation')}
              />
              {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation && (
                  <span className="text-red-500">
                    {formik.errors.passwordConfirmation}
                  </span>
                )}
            </div>

            <div className="mt-4 w-full">
              <input
                type="checkbox"
                {...formik.getFieldProps('emailSubscription')}
              />
              <span className="font-bold mx-2">{t('emailSubscription')}</span>
            </div>

            <div className="flex justify-between items-center mt-6">
              {!formik.isSubmitting && (
                <button
                  className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                  id="signup"
                  type="submit"
                >
                  {t('signUp')}
                </button>
              )}
              {formik.isSubmitting && <span>One sec ...</span>}
            </div>

            <div className="text-center">
              <h1 className="text-grey-darker block mb-2 mt-5">{t('or')}</h1>
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
              <Link to="/signin" className="no-underline text-blue">
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
export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageInfo
    }
  }
`
export default Signup

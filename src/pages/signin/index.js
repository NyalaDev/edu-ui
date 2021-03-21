import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import * as Yup from 'yup'
import { graphql, navigate } from 'gatsby'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import SocialButton from '../../components/SocialButton'
import { signin } from '../../services/api'
import { AuthContext } from '../../contexts/AuthContext'
import ActivityIndicator from '../../components/ActivityIndicator'

const providers = ['GitHub']

const SiginPage = () => {
  const { isLoggedIn, setCurrentUser, setAuthToken } = useContext(AuthContext)
  const { t } = useTranslation()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

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
        const data = await signin(values)
        setAuthToken(data.jwt)
        setCurrentUser(data.user)
        navigate('/')
      } catch (err) {
        const message = err.message.match(/(403|400)/)
          ? 'errors.invalid_auth'
          : 'errors.generic'
        toast.error(t(message))
      }
    },
  })

  return (
    <Layout>
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md overflow-hidden mx-auto">
        <div className="py-4 px-6">
          <h2 className="text-center text-gray-700 text-3xl">{t('signIn')}</h2>
          <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg  mt-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="identifier"
                  className="text-grey-darker block mb-2"
                >
                  {t('userOrEmail')}
                </label>
                <input
                  id="identifier"
                  {...formik.getFieldProps('identifier')}
                  type="text"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder={t('userOrEmail')}
                />
                {formik.touched.identifier && formik.errors.identifier ? (
                  <div className="text-red-600 mt-1">
                    {formik.errors.identifier}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="text-grey-darker block mb-2"
                >
                  {t('password')}
                </label>
                <input
                  {...formik.getFieldProps('password')}
                  id="password"
                  type="password"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder={t('passPlaceholder')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600 mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between">
                <ActivityIndicator active={formik.isSubmitting}>
                  <button
                    className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                    type="submit"
                  >
                    {t('signIn')}
                  </button>
                </ActivityIndicator>
                <ActivityIndicator>
                  <div>
                    {' '}
                    <Link to="./forgotPassword">{t('forgotPass')}</Link>
                  </div>
                </ActivityIndicator>
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
          </div>

          <div className="text-center">
            <p className="text-grey-dark text-sm">
              {`${t('noAccount')} `}
              <Link to="/signup" className="no-underline text-blue font-bold">
                {t('createAccount')}
              </Link>
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
export default SiginPage

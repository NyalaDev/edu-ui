import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import { forgotPassword } from '../../services/api'

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false)
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async values => {
      try {
        setSuccess(false)
        await forgotPassword(values)
        setSuccess(true)
      } catch (err) {
        setSuccess(false)
        const message = err.message.match(/(403|400)/)
          ? t('badRequest')
          : t('somethingWrong')
        toast.error(message)
      }
    },
  })

  return (
    <Layout>
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md overflow-hidden mx-auto">
        <div className="py-4 px-6">
          <h2 className="text-center font-bold text-gray-700 text-3xl">
            {t('forgotPass')}
          </h2>
          {!success && (
            <form onSubmit={formik.handleSubmit}>
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
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-600 mt-1">
                    {formik.errors.email}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                  type="submit"
                >
                  {t('submit')}
                </button>
                {formik.isSubmitting && <span>One sec ...</span>}
              </div>
            </form>
          )}
          {success && (
            <div className="mt-3 text-center">
              {`Instructions on how to reset your password were sent to ${formik.values.email}`}
            </div>
          )}
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

export default ForgotPassword

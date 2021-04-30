import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import { resetPassword } from '../../services/api'
const ResetPassword = () => {
  const [success, setSuccess] = useState(false)
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6).required(),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords should match!')
        .required(),
    }),
    onSubmit: async values => {
      try {
        setSuccess(false)
        await resetPassword(values)
        setSuccess(true)
      } catch (err) {
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
            {t('resetPass')}
          </h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4 w-full">
              <label
                htmlFor="password"
                className="font-bold text-grey-darker block mb-2"
              >
                {t('newPassword')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="password"
                placeholder={t('newPassword')}
                aria-label="password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <span>{formik.errors.password}</span>
              )}
            </div>

            <div className="mt-4 w-full">
              <label
                htmlFor="passwordConfirmation"
                className="font-bold text-grey-darker block mb-2"
              >
                {t('newPassConfirm')}
              </label>
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="password"
                placeholder={t('newPassConfirm')}
                aria-label="passwordConfirmation"
                {...formik.getFieldProps('passwordConfirmation')}
              />
              {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation && (
                  <span>{formik.errors.passwordConfirmation}</span>
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
          {success && <div>Your password has been reset successfully</div>}
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
export default ResetPassword

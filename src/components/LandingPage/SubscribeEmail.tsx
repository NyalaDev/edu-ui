import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Input from '../Input'
import Button from '../General/Button'
import Spinner from '../Spinner'
import useLanguage from '../../hooks/useLanguage'
import { subscribeToMailingList } from '../../services/api'
import { AppLocales } from '../../common/config'
import { AppLocale } from '../../types/api.types'

type SubscribeEmailProps = {
  title: string
}

const SubscribeEmail: React.FC<SubscribeEmailProps> = ({ title = '' }) => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [loading, setLoading] = useState<boolean>()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(t('validation.email'))
        .required(t('validation.required')),
    }),
    onSubmit: async values => {
      try {
        setLoading(true)
        const { result } = await subscribeToMailingList({
          email: values.email,
          LANGUAGE: language,
        })
        if (result === 'error') {
          toast.error(t('landingPage.subscribeError'))
        } else {
          formik.resetForm()
          toast.success(t('landingPage.subscribeSuccess'))
        }
      } catch (e) {
        toast.error(t('landingPage.subscribeError'))
      } finally {
        setLoading(false)
      }
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="title font-bold text-blue-900" htmlFor="email">
        {title || t('landingPage.notifyMeWhenLaunch')}
      </label>
      <div className="flex items-center w-full sm:w-1/2">
        <div className="flex-1">
          <Input
            wrapperClasses="mt-0"
            name="email"
            {...formik.getFieldProps('email')}
            type="text"
            placeholder={t('email')}
          />
        </div>
        <div className="w-32 mx-2 mt-2">
          {loading ? (
            <Spinner />
          ) : (
            <Button type="submit">{t('landingPage.subscribe')}</Button>
          )}
        </div>
      </div>
      {formik.touched.email && formik.errors.email ? (
        <div className="font-bold text-red-600 mt-1">{formik.errors.email}</div>
      ) : null}
    </form>
  )
}

export default SubscribeEmail

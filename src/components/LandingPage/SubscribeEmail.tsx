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
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-brmg-warning h-60 flex justify-center items-center flex-col"
      >
        <label className="title font-bold" htmlFor="email">
          {title || t('landingPage.notifyMeWhenLaunch')}
        </label>

        <div>
          <input
            className="mt-3 rounded-2xl px-2 h-8 w-120"
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
        {formik.touched.email && formik.errors.email ? (
          <div className="font-bold text-red-600 mt-1">
            {formik.errors.email}
          </div>
        ) : null}
      </form>
      <div
        className="w-full h-8"
        style={{
          backgroundImage: 'url(/images/subscribe-bg.png)',
          backgroundSize: '40% 100%',
          backgroundRepeat: 'repeat',
        }}
      />
    </>
  )
}

export default SubscribeEmail

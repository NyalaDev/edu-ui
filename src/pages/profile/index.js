import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { navigate } from 'gatsby'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import { getUser } from '../../services/util'
import { getProfile, addProfile } from '../../services/api'

const MyProfile = () => {
  const { t } = useTranslation()
  const user = getUser()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }
    const getProfileData = async () => {
      try {
        const { data } = await getProfile()
        if (data) {
          setProfile(data)
        }
      } catch (err) {
        if (err.message.match(/(403|400)/)) {
          toast.error(t('notUser'))
        } else toast.error(t('somethingWrong'))
      }
    }
    getProfileData()
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bio: profile.bio || '',
      linkedin: profile.linkedin || '',
      github: profile.github || '',
      twitter: profile.twitter || '',
    },
    validationSchema: Yup.object({
      bio: Yup.string().min(50, t('atLeast50')),
      linkedin: Yup.string().url(t('beLink')),
      github: Yup.string().url(t('beLink')),
      twitter: Yup.string().url(t('beLink')),
    }),
    onSubmit: async values => {
      try {
        await addProfile(values)
        toast.success(t('saved'))
      } catch (err) {
        if (err.message.match(/(403|400)/)) {
          toast.error(t('notUser'))
        } else toast.error(t('somethingWrong'))
      }
    },
  })

  return (
    <Layout>
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md overflow-hidden mx-auto">
        <div className="py-4 px-6">
          <h2 className="text-center font-bold text-gray-700 text-3xl">
            {t('profile')}
          </h2>
          <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg  mt-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="bio"
                  className="font-bold text-grey-darker block mb-2"
                >
                  {t('bio')}
                </label>
                <textarea
                  id="bio"
                  {...formik.getFieldProps('bio')}
                  type="text"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder={t('bio')}
                />
                {formik.touched.bio && formik.errors.bio ? (
                  <div className="text-red-600 mt-1">{formik.errors.bio}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="linkedin"
                  className="font-bold text-grey-darker block mb-2"
                >
                  {t('socialLink', { provider: 'Linkedin' })}
                </label>
                <input
                  id="linkedin"
                  {...formik.getFieldProps('linkedin')}
                  type="text"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder={t('socialLink', { provider: 'Linkedin' })}
                />
                {formik.touched.linkedin && formik.errors.linkedin ? (
                  <div className="text-red-600 mt-1">
                    {formik.errors.linkedin}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="github"
                  className="font-bold text-grey-darker block mb-2"
                >
                  {t('socialLink', { provider: 'Github' })}
                </label>
                <input
                  id="github"
                  {...formik.getFieldProps('github')}
                  type="text"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder={t('socialLink', { provider: 'Github' })}
                />
                {formik.touched.github && formik.errors.github ? (
                  <div className="text-red-600 mt-1">
                    {formik.errors.github}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="twitter"
                  className="font-bold text-grey-darker block mb-2"
                >
                  {t('socialLink', { provider: 'Twitter' })}
                </label>
                <input
                  id="twitter"
                  {...formik.getFieldProps('twitter')}
                  type="text"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder={t('socialLink', { provider: 'Twitter' })}
                />
                {formik.touched.twitter && formik.errors.twitter ? (
                  <div className="text-red-600 mt-1">
                    {formik.errors.twitter}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                  type="submit"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyProfile
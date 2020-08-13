import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { navigate } from 'gatsby'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Layout from '../components/Layout'
import { getUser } from '../services/util'

import { getProfile, addProfile } from '../services/api'

const MyProfile = () => {
  const { t } = useTranslation()
  const user = getUser()
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }
    const getProfiles = async () => {
      const { data } = await getProfile(user.id)
      setProfile(data)
    }
    getProfiles()
  }, [])

  const formik = useFormik({
    initialValues: {
      bio: '',
      linkedin: '',
      github: '',
      twitter: '',
    },
    validationSchema: Yup.object({
      bio: Yup.string().min(50, 'should be at least 50'),
      linkedin: Yup.string().url('Should be a link'),
      github: Yup.string().url('Should be a link'),
      twitter: Yup.string().url('Should be a link'),
    }),
    onSubmit: async values => {
      try {
        await addProfile(values)
        setError(null)
      } catch (err) {
        if (err.message.match(/(403|400)/)) {
          setError('You are not a user')
        } else setError('Something went wrong')
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
                <input
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
                  {t('linkedin')}
                </label>
                <input
                  id="linkedin"
                  {...formik.getFieldProps('linkedin')}
                  type="text"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder={t('linkedin')}
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
                  {t('github')}
                </label>
                <input
                  id="github"
                  {...formik.getFieldProps('github')}
                  type="text"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder={t('github')}
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
                  {t('twitter')}
                </label>
                <input
                  id="twitter"
                  {...formik.getFieldProps('twitter')}
                  type="text"
                  className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  placeholder={t('twitter')}
                />
                {formik.touched.twitter && formik.errors.twitter ? (
                  <div className="text-red-600 mt-1">
                    {formik.errors.twitter}
                  </div>
                ) : null}
              </div>
            </form>
          </div>
          {profile}
          {error && <div className="text-red-600 mt-1">{error}</div>}
        </div>
      </div>
    </Layout>
  )
}

export default MyProfile

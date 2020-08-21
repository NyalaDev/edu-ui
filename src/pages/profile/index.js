import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { navigate } from 'gatsby'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import { getUser } from '../../services/util'
import { getProfile, addProfile, uploadFile } from '../../services/api'
import { DEFAULT_PROFILE_PIC } from '../../common/const'
import Spinner from '../../components/Spinner'

const MyProfile = () => {
  const { t } = useTranslation()
  const user = getUser()
  const [profile, setProfile] = useState({})
  const [uploading, setUploading] = useState(false)
  const fileInputEl = useRef(null)

  useEffect(() => {
    if (isEmpty(user)) {
      navigate('/signin')
      return
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
      name: profile.name || '',
      bio: profile.bio || '',
      linkedin: profile.linkedin || '',
      github: profile.github || '',
      twitter: profile.twitter || '',
    },
    validationSchema: Yup.object({
      bio: Yup.string().min(50, t('atLeast50')),
      linkedin: Yup.string(),
      github: Yup.string(),
      twitter: Yup.string(),
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

  const handleFileChange = async e => {
    e.preventDefault()
    const file = e.target.files[0] || {}
    if (file) {
      try {
        setUploading(true)
        // FIXME: Use https://strapi.io/documentation/v3.x/plugins/upload.html#upload-files-related-to-an-entry
        const data = await uploadFile(file)
        if (!data && !data[0]) {
          toast.error(t('errors.generic'))
          setUploading(false)
          return
        }

        const updateProfileRequest = {
          profilepicture: data[0],
        }
        const updatedProfile = await addProfile(updateProfileRequest)
        setProfile(updatedProfile)
        setUploading(false)
      } catch (error) {
        setUploading(false)
        toast.error(t('errors.generic'))
      }
    }
  }

  const { profilepicture } = profile
  const profilePictureUrl =
    (profilepicture && profilepicture.url) || DEFAULT_PROFILE_PIC
  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col flex-1 items-center justify-start">
          <img
            className="w-100 h-100"
            src={profilePictureUrl}
            alt="Avatar of Jonathan Reinink"
          />
          <input
            type="file"
            hidden
            ref={fileInputEl}
            name="photo"
            onChange={handleFileChange}
          />

          {!uploading && (
            <button
              type="button"
              className="bg-gray-900 mt-3 hover:bg-gray-600 text-white px-4 rounded"
              onClick={() => fileInputEl.current.click()}
            >
              {t('updatePhoto')}
            </button>
          )}
          {uploading && <Spinner />}
        </div>
        <div className="w-2/3">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="font-bold text-grey-darker block mb-2"
              >
                {t('name')}
              </label>
              <input
                id="name"
                {...formik.getFieldProps('name')}
                type="text"
                className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                placeholder={t('name')}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600 mt-1">{formik.errors.name}</div>
              ) : null}
            </div>

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
                <div className="text-red-600 mt-1">{formik.errors.github}</div>
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
                <div className="text-red-600 mt-1">{formik.errors.twitter}</div>
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
    </Layout>
  )
}

export default MyProfile

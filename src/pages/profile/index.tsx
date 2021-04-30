import React, { useState, useEffect, useRef, useContext } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { navigate, graphql } from 'gatsby'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import InputWithAddOn from '../../components/InputWithAddOn'
import { AuthContext } from '../../contexts/AuthContext'
import { addProfile, uploadFile } from '../../services/api'
import { getProfilePicuteUrlFromUserObject } from '../../common/util'
const MyProfile = () => {
  const { t } = useTranslation()
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [uploading, setUploading] = useState(false)
  const fileInputEl = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isEmpty(currentUser)) {
      navigate('/signin')
    }
  }, [])
  const profile = currentUser?.profile || {
    name: '',
    bio: '',
    linkedin: '',
    github: '',
    twitter: '',
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile.name,
      bio: profile.bio,
      linkedin: profile.linkedin,
      github: profile.github,
      twitter: profile.twitter,
    },
    validationSchema: Yup.object({
      bio: Yup.string().min(50, t('atLeast50')),
      linkedin: Yup.string(),
      github: Yup.string(),
      twitter: Yup.string(),
    }),
    onSubmit: async values => {
      try {
        const response = await addProfile(values)
        setCurrentUser({ ...currentUser!, profile: response })
        toast.success(t('saved'))
      } catch (err) {
        if (err.message.match(/(403|400)/)) {
          toast.error(t('notUser'))
        } else toast.error(t('somethingWrong'))
      }
    },
  })
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files && e.target.files[0]
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
        setCurrentUser({ ...currentUser!, profile: updatedProfile })
        setUploading(false)
      } catch (error) {
        setUploading(false)
        toast.error(t('errors.generic'))
      }
    }
  }
  const profilePictureUrl = getProfilePicuteUrlFromUserObject(currentUser)
  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col flex-1 items-center justify-start">
          <img
            className="w-64 h-auto"
            src={profilePictureUrl}
            alt="Avatar of Jonathan Reinink"
          />
          {!isEmpty(profile) && (
            <>
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
                  onClick={() => fileInputEl?.current?.click()}
                >
                  {t('updatePhoto')}
                </button>
              )}
              {uploading && <Spinner />}
            </>
          )}
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
              <InputWithAddOn
                id="linkedin"
                placeholder={t('socialLink', { provider: 'Linkedin' })}
                prefix="https://linkedin.com/in/"
                {...formik.getFieldProps('linkedin')}
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
              <InputWithAddOn
                id="github"
                placeholder={t('socialLink', { provider: 'github' })}
                prefix="https://github.com/"
                {...formik.getFieldProps('github')}
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
              <InputWithAddOn
                id="twitter"
                placeholder={t('socialLink', { provider: 'twitter' })}
                prefix="https://twitter.com/"
                {...formik.getFieldProps('twitter')}
              />
              {formik.touched.twitter && formik.errors.twitter ? (
                <div className="text-red-600 mt-1">{formik.errors.twitter}</div>
              ) : null}
            </div>

            <div className="flex items-center justify-between">
              {formik.isSubmitting && <Spinner />}
              {!formik.isSubmitting && (
                <button
                  className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                  type="submit"
                >
                  {t('save')}
                </button>
              )}
            </div>
          </form>
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
export default MyProfile

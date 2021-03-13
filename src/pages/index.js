import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { getLocalStorage, isBrowser } from '../services/localStorage'
import Spinner from '../components/Spinner'
import Modal from '../components/Modal'
import DefaultLanguage from '../components/DefaultLanguage'

const IndexPage = () => {
  // Do not show the landing page for now
  if (isBrowser) {
    navigate('/courses')
  }

  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (!getLocalStorage('siteLang')) {
      setOpen(true)
    }
  }, [])

  return (
    <Layout>
      <Seo title="Home" />
      <Spinner />

      {open && (
        <Modal
          withActions={false}
          onDismiss={() => setOpen(false)}
          title={t('preferedLanguage')}
        >
          <div className="flex justify-center items-center flex-col min-h-40">
            <div className="text-2xl font-semibold mb-3">
              {t('choosePreferedLanguage')}
            </div>
            <div>
              <DefaultLanguage onDismiss={() => setOpen(false)} />
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  )
}

export default IndexPage

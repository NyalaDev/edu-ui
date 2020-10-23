import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

const Breadcrumbs = ({ name }) => {
  const { t } = useTranslation()
  return (
    <nav className="bg-gray-400  p-3 rounded font-sans w-full my-4">
      <ol className="list-reset flex">
        <li>
          <Link className="text-purple-700 font-bold" to="/dashboard">
            {t('dashboard')}
          </Link>
        </li>
        {name && (
          <>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <a href="#" className="text-gray-900">
                {name}
              </a>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}

Breadcrumbs.propTypes = {
  name: PropTypes.string,
}

Breadcrumbs.defaultProps = {
  name: '',
}

export default Breadcrumbs

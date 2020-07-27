import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import SearchBar from './SearchBar'

const MobileMenu = ({ open, navBarItems }) => {
  const { t } = useTranslation()
  // const activeClass = 'bg-gray-900'
  return (
    <div className={`${open ? '' : 'hidden'} sm:hidden`}>
      <div className="px-2 pt-2 pb-3">
        {navBarItems.map(navItem => (
          <Link
            key={navItem.id}
            to={navItem.to}
            className="block px-3 py-2 rounded-md text-base font-medium text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            {t(navItem.label)}
          </Link>
        ))}
      </div>
      <div className="px-4 py-2">
        <SearchBar />
      </div>
    </div>
  )
}

MobileMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  navBarItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      to: PropTypes.string,
    })
  ).isRequired,
}

export default MobileMenu

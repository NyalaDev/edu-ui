import React, { useState, useContext } from 'react'
import { navigate } from 'gatsby'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import { AuthContext } from '../../contexts/AuthContext'
import { getProfilePicuteUrlFromUserObject } from '../../common/util'
import { getTokenFromLocaleStorageIfAny } from '../../services/localStorage'

const UserMenu = () => {
  const { currentUser, isTeacher, logout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const toggleOpen = () => {
    setOpen(!open)
  }

  const onLogoutClick = () => {
    logout()
    navigate('/')
  }

  const profilePictureUrl = getProfilePicuteUrlFromUserObject(currentUser)

  const token = getTokenFromLocaleStorageIfAny()
  const dashboardUrl = `${
    process.env.GATSBY_DASHBOARD_URL || 'https://edu-dashboard.barmaga.io'
  }/auth?authToken=${token}`
  // FIXME: Change Dropdown on desktop to open right
  return (
    <div className="ml-3 relative">
      <div className="mr-4">
        <button
          className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
          onClick={toggleOpen}
          type="button"
        >
          <img
            className="h-8 w-8 rounded-full"
            src={profilePictureUrl}
            alt=""
          />
        </button>
      </div>

      <div
        className={`${
          open ? '' : 'hidden'
        } origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg`}
      >
        <div
          className="py-1 rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          {isTeacher && (
            <a
              href={dashboardUrl}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
              role="menuitem"
            >
              {t('dashboard')}
            </a>
          )}
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            role="menuitem"
          >
            {t('profile')}
          </Link>
          <Link
            to="#"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            role="menuitem"
            onClick={onLogoutClick}
          >
            {t('signOut')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserMenu

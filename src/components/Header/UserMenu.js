import React, { useState } from 'react'
import { Link } from 'gatsby'

// import { getUser } from '../../services/auth'
import { useTranslation } from 'react-i18next'

const UserMenu = () => {
  const [open, setOpen] = useState(false)
  // const { username } = getUser()
  const { t } = useTranslation()
  // const greetingMessage = `مرحباً ${username}! `

  const toggleOpen = () => {
    setOpen(!open)
  }

  // FIXME: Change Dropdown on desktop to open right
  return (
    <div className="ml-3 relative">
      <div>
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
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>

      <div
        className={`${
          open ? '' : 'hidden'
        } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}
      >
        <div
          className="py-1 rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            role="menuitem"
          >
            {t('profile')}
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            role="menuitem"
          >
            {t('settings')}
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            role="menuitem"
          >
            {t('signOut')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserMenu

import React from 'react'
import { isLoggedIn, getUser } from '../../services/util'

const UserMenu = () => {
  let greetingMessage = `مرحباً ${getUser().username.toUpperCase()} `

  return (
    <div className="relative text-sm">
      <button
        id="userButton"
        className="flex items-center focus:outline-none mr-3"
      >
        <img
          className="w-8 h-8 rounded-full mr-4"
          src="https://i.pravatar.cc/300"
          alt="Avatar of User"
        />
        <p className=" md:inline-block text-purple-600 block">
          {greetingMessage}{' '}
        </p>
      </button>
      <div
        id="userMenu"
        className="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible"
      >
        <ul className="list-reset">
          <li>
            <a
              href="#"
              className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
            >
              My account
            </a>
          </li>
          <li>
            <hr className="border-t mx-2 border-gray-400" />
          </li>
          <li>
            <a
              href="#"
              className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserMenu

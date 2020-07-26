import React, { useState } from 'react'

import Logo from './Logo'
import UserMenu from './UserMenu'
import NavBar from './Navbar'

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <nav
      id="header"
      style={{ direction: 'rtl' }}
      className="bg-gray-900 fixed w-full z-10 top-0 shadow"
    >
      <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
        <Logo />
        <div className="w-1/2 pr-0">
          <div className="flex relative float-right">
            <div className="block lg:hidden pr-4">
              <button
                id="nav-toggle"
                className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <NavBar open={navbarOpen} />
      </div>
    </nav>
  )
}

export default Header

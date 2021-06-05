import React from 'react'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const Header: React.FC = () => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopMenu />
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
    </>
  )
}

export default Header

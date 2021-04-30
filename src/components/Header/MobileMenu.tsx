import React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import Search from '../Search'
import LanguageSwitcher from '../LanguageSwitcher'

type MobileMenuProps = {
  open: boolean
  navBarItems: {
    id?: number
    label?: string
    to?: string
  }[]
}
const MobileMenu: React.FC<MobileMenuProps> = ({ open, navBarItems }) => {
  const { t } = useTranslation()
  // const activeClass = 'bg-gray-900'
  return (
    <div className={`${open ? '' : 'hidden'} sm:hidden`}>
      <div className="px-2 pt-2 pb-3">
        {navBarItems.map(navItem => (
          <Link
            key={navItem.id}
            to={navItem.to!}
            className="block px-3 py-2 rounded-md text-base font-medium text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            {t(navItem.label!)}
          </Link>
        ))}
        <a
          rel="noreferrer"
          target="_blank"
          className="block px-3 py-2 rounded-md text-base font-medium text-yellow-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          href="https://chuffed.org/project/barmagaio"
        >
          {t('landingPage.supportUs')}
        </a>
      </div>
      <div className="px-4 py-2">
        <Search />
      </div>
      <div className="block md:hidden px-4 py-2">
        <LanguageSwitcher />
      </div>
    </div>
  )
}
export default MobileMenu

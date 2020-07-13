import React from 'react'

const Logo = () => {
  return (
    <div className="w-1/2 pl-2 md:pl-0">
      <a
        className="text-white text-base xl:text-xl no-underline hover:no-underline font-bold"
        href="/"
      >
        <img
          style={{ height: 30 }}
          src="https://s3.abolkog.com/coderhub/logo.png"
          alt="Coderhub"
        />
      </a>
    </div>
  )
}

export default Logo

import React from 'react'
import PropTypes from 'prop-types'

const Resourses = ({ resourses }) => {
  return (
    <>
      {resourses.map(resourse => (
        <>
          {resourse.type === 'link' && (
            <div>
              <a
                className="flex flex-row-reverse items-center justify-center bg-purple-800 text-white text-center hover:bg-gray-900 font-bold uppercase text-md px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
                style={{ transition: 'all .15s ease' }}
                href={resourse.link}
                target="_blank"
                rel="noreferrer"
              >
                <span>{resourse.text}</span>
              </a>
            </div>
          )}
        </>
      ))}
    </>
  )
}

Resourses.propTypes = {
  resourses: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      link: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
}

export default Resourses

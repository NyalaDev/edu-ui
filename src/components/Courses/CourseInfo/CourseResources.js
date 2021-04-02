import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { uniqueId } from 'lodash'
import { FaPaperclip } from 'react-icons/fa'

const CourseResources = ({ course }) => {
  const { t } = useTranslation()
  const { resources = [] } = course

  const linkResources = resources
    ? resources.filter(r => r.type === 'link')
    : []

  if (!linkResources || !linkResources.length) return null

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-5 ">
      <div className="px-6 py-3 bg-purple-800">
        <h1 className="text-white title text-lg items-center justify-center flex">
          <FaPaperclip />
          <span className="mx-1">{t('resources')}</span>
        </h1>
      </div>

      <div className="py-4 px-6">
        <ul>
          {resources.map(resource => {
            if (resource.type !== 'link') return null

            return (
              <li
                key={uniqueId('resource-')}
                className="border list-none rounded-sm px-3 py-3"
              >
                <a
                  className="text-purple-800 py-1 "
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{resource.text}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

CourseResources.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        url: PropTypes.string,
        text: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default CourseResources

// import React from 'react'
// import PropTypes from 'prop-types'

// const CourseResources = ({ resourses }) => {
//   return (
//     <>
//       {resourses.map(resourse => (
//         <>
//           {resourse.type === 'link' && (
//             <div>
//               <a
//                 className="flex flex-row-reverse items-center justify-center bg-purple-800 text-white text-center hover:bg-gray-900 font-bold uppercase text-md px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
//                 style={{ transition: 'all .15s ease' }}
//                 href={resourse.link}
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 <span>{resourse.text}</span>
//               </a>
//             </div>
//           )}
//         </>
//       ))}
//     </>
//   )
// }

// CourseResources.propTypes = {
//   resourses: PropTypes.arrayOf(
//     PropTypes.shape({
//       type: PropTypes.string,
//       link: PropTypes.string,
//       text: PropTypes.string,
//     })
//   ).isRequired,
// }

// export default CourseResources

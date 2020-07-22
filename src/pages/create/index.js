import React from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import formEnhancer from './enhancedForm'

const Create = ({
  data,
  getFieldProps,
  handleSubmit,
  touched,
  errors,
  isSubmitting,
}) => {
  const {
    allStrapiCourse: { edges: courses },
  } = data

  return (
    <Layout>
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md overflow-hidden mx-auto">
        <div className="py-4 px-6">
          <h2 className="text-center font-bold text-gray-700 text-3xl">
            Add Lecture (Dev)
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mt-4 w-full">
              <select
                name="course"
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                {...getFieldProps('course')}
              >
                <option value="" label="Select a course" />
                {courses.map(({ node: course }) => {
                  const { strapiId, title } = course

                  return (
                    <option key={strapiId} value={strapiId}>
                      {title}
                    </option>
                  )
                })}
              </select>
              {touched.course && errors.course && <span>{errors.course}</span>}
            </div>
            <div className="mt-4 w-full">
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="text"
                placeholder="Lecture Title"
                aria-label="Lecture Title"
                name="title"
                {...getFieldProps('title')}
              />
              {touched.title && errors.title && <span>{errors.title}</span>}
            </div>

            <div className="mt-4 w-full">
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="text"
                placeholder="Lecture Description"
                aria-label="Lecture Description"
                name="description"
                {...getFieldProps('description')}
              />
              {touched.description && errors.description && (
                <span>{errors.description}</span>
              )}
            </div>

            <div className="mt-4 w-full">
              <input
                className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
                type="text"
                placeholder="Youtube URL"
                aria-label="Youtube URL"
                name="url"
                {...getFieldProps('url')}
              />
              {touched.url && errors.url && <span>{errors.url}</span>}
            </div>

            <div className="flex justify-between items-center mt-6">
              {!isSubmitting && (
                <button
                  className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                  type="submit"
                >
                  Save
                </button>
              )}
              {isSubmitting && <span>One sec ...</span>}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CreateQuery {
    allStrapiCourse(sort: { fields: created_at, order: DESC }) {
      edges {
        node {
          strapiId
          title
        }
      }
    }
  }
`

export default formEnhancer(Create)

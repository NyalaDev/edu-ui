const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const couseViewTemplate = path.resolve('./src/templates/CourseView.js')
  const lectureViewTemplate = path.resolve(
    './src/templates/LectureView/index.js'
  )
  const {
    data: {
      allStrapiCourse: { edges: courses },
      allStrapiLecture: { edges: lectures },
    },
  } = await graphql(`
    {
      allStrapiCourse(limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }

      allStrapiLecture(limit: 1000) {
        edges {
          node {
            id
            strapiId
            course {
              id
              slug
            }
          }
        }
      }
    }
  `)
  courses.forEach(edge => {
    const {
      node: { id, slug },
    } = edge
    createPage({
      component: couseViewTemplate,
      path: `/courses/${slug}`,
      context: {
        id,
      },
    })
  })

  lectures.forEach(edge => {
    const {
      node: { id, strapiId, course },
    } = edge

    createPage({
      component: lectureViewTemplate,
      path: `/courses/${course.slug}/lectures/${strapiId}`,
      context: {
        id,
        courseSlug: course.slug,
      },
    })
  })
}

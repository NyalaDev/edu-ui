const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const couseViewTemplate = path.resolve('./src/templates/CourseView/index.js')
  const {
    data: {
      allStrapiCourse: { edges: courses },
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
}
